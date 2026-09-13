# Hostinger Deployment Guide (হোস্টিংগার ডিপ্লয়মেন্ট গাইড)
**Website:** Dimension Composition (Luxury Interior Architecture & Turnkey Design Studio)

এই গাইডটি অনুসরণ করে আপনি খুব সহজেই আপনার সম্পূর্ণ ওয়েবসাইট এবং প্রফেশনাল অ্যাডমিন প্যানেল **Hostinger**-এ ডিপ্লয় করতে পারবেন।

---

## 📋 প্রজেক্টের বৈশিষ্ট্য (Architecture Overview)
- **Frontend:** React 19 + Vite + TailwindCSS (Build Output: `dist/`)
- **Backend:** Node.js + Express + Mongoose + JWT Auth (Entry Point: `server/index.js`)
- **Single-Port Production:** প্রোডাকশনে Express সার্ভার নিজেই `dist/` ফোল্ডারের ফাইল সার্ভ করে এবং রিয়েক্ট রাউটিং হ্যান্ডেল করে। ফলে কোনো CORS সমস্যা বা দুটি ভিন্ন সার্ভার চালুর ঝামেলা নেই!
- **Admin Panel URL:** `https://yourdomain.com/admin/login`

---

## ধাপ ১: MongoDB Atlas ডাটাবেস সেটআপ (ফ্রি ক্লাউড ডাটাবেস)
1. [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)-এ যান এবং একটি ফ্রি অ্যাকাউন্ট তৈরি করুন বা লগইন করুন।
2. একটি ফ্রি **M0 Cluster** তৈরি করুন (Region: Singapore বা Mumbai সিলেক্ট করা ভালো)।
3. **Database Access** মেনু থেকে একটি নতুন ইউজার বানান (যেমন: `admin_user` এবং একটি স্ট্রং পাসওয়ার্ড)।
4. **Network Access** মেনুতে গিয়ে **Add IP Address**-এ ক্লিক করে **Allow Access from Anywhere (`0.0.0.0/0`)** সিলেক্ট করুন (যাতে হোস্টিংগার কানেক্ট করতে পারে)।
5. **Database** > **Connect** > **Drivers**-এ ক্লিক করে কানেকশন স্ট্রিংটি কপি করুন:
   ```text
   mongodb+srv://admin_user:<password>@cluster0.xxxxx.mongodb.net/dimension_composition?retryWrites=true&w=majority
   ```
   *(এখানে `<password>` এর জায়গায় আপনার ইউজারের পাসওয়ার্ড দিন)*

---

## ধাপ ২: হোস্টিংগারে ফাইল আপলোড প্রস্তুতি
লোকাল কম্পিউটারে প্রজেক্ট ফোল্ডারে টার্মিনাল খুলে প্রথমে ফ্রন্টএন্ড বিল্ড করে নিন:
```bash
npm run build
```
ফাইলগুলো জিপ (`.zip`) করার সময় নিচের ফাইল/ফোল্ডারগুলো বাদ দিন (যাতে সাইজ ছোট থাকে):
- ❌ `node_modules/` (বাদ দিন, এটি হোস্টিংগারে ইনস্টল হবে)
- ❌ `.git/` (বাদ দিন)

বাকি সব ফাইল (`server/`, `src/`, `dist/`, `public/`, `package.json`, `.env`, ইত্যাদি) একসাথে সিলেক্ট করে একটি `website.zip` বানান।

---

## ধাপ ৩: Hostinger hPanel-এ Node.js App কনফিগারেশন

Hostinger-এর **Business Web Hosting**, **Cloud Hosting**, অথবা **VPS Hosting**-এ Node.js অ্যাপ রান করা যায়:

### অপশন A: Hostinger hPanel / cPanel (Setup Node.js App)
1. **Hostinger hPanel**-এ লগইন করুন এবং আপনার ডোমেইনের ড্যাশবোর্ডে যান।
2. সার্চবারে **"Node.js"** লিখে **"Setup Node.js App"** বা **"Node.js"** অপশনে যান।
3. **Create Application**-এ ক্লিক করুন:
   - **Node.js Version:** `18.x` বা `20.x` বা তার উপরে সিলেক্ট করুন।
   - **Application Mode:** `Production`
   - **Application Root:** `public_html` (বা আপনার পছন্দের ফোল্ডার)
   - **Application Startup File:** `server/index.js`
4. **Create** এ ক্লিক করুন।
5. **File Manager**-এ যান এবং আপনার তৈরি করা `website.zip` ফাইলটি `public_html` ফোল্ডারে আপলোড করে **Extract** (আনজিপ) করুন।
6. File Manager-এ একটি নতুন ফাইল তৈরি করুন নাম দিন `.env` (অথবা `server/.env`):
   ```env
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://admin_user:YourPass123@cluster0.xxxxx.mongodb.net/dimension_composition?retryWrites=true&w=majority
   JWT_SECRET=dimension_composition_ultra_secret_key_2026
   ADMIN_SETUP_SECRET=dc_master_2026
   ```
7. Node.js App ড্যাশবোর্ডে ফিরে এসে **"Run NPM Install"** বাটনে ক্লিক করুন (বা SSH টার্মিনালে `npm install --production` রান করুন)।
8. অ্যাপটি **Restart** করুন।

---

### অপশন B: Hostinger VPS (Ubuntu / Debian + PM2)
যদি আপনি Hostinger VPS ব্যবহার করেন:
```bash
# ১. রিপোজিটরি ক্লোন বা ফাইল আনজিপ করুন
cd /var/www/dimension-composition

# ২. ডিপেন্ডেন্সি ইনস্টল ও বিল্ড করুন
npm install
npm run build

# ৩. এনভায়রনমেন্ট ফাইল সেট করুন
cp .env.production.example .env
nano .env   # (আপনার MONGO_URI বসান)

# ৪. PM2 দিয়ে ব্যাকএন্ড ব্যাকগ্রাউন্ডে চালু করুন
npm install -g pm2
pm2 start server/index.js --name "dimension-website"
pm2 save
pm2 startup
```

Nginx কনফিগারেশন (VPS-এর জন্য):
```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## ধাপ ৪: প্রথমবার অ্যাডমিন অ্যাকাউন্ট তৈরি ও লগইন
1. ব্রাউজারে যান: `https://yourdomain.com/admin/login`
2. সিস্টেমে যেহেতু কোনো অ্যাডমিন অ্যাকাউন্ট আগে থেকে নেই, সিস্টেমটি সরাসরি **"Initial System Administration Setup"** মোডে চলে আসবে।
3. আপনার নাম, অ্যাডমিন ইমেইল (`admin@dimensioncomposition.com`) এবং একটি গোপন পাসওয়ার্ড দিয়ে **"Create Admin & Launch Portal"** বাটনে ক্লিক করুন।
4. সফলভাবে লগইন হওয়ার সাথে সাথেই আপনি পূর্ণাঙ্গ **Dimension Composition Admin Console** দেখতে পাবেন!

---

## 🎯 অ্যাডমিন প্যানেল থেকে যা যা নিয়ন্ত্রণ করা যাবে:
1. **Projects & Portfolio:**
   - যেকোনো সময় নতুন প্রজেক্ট অ্যাড করুন (ছবি, স্কয়ার ফিট, বাজেট, গ্যালারি লিংক, ক্যাটাগরি)।
   - বিদ্যমান যেকোনো প্রজেক্ট এডিট বা ডিলিট করুন।
2. **Cost Calculator Leads:**
   - ওয়েবসাইটের কস্ট ক্যালকুলেটর থেকে যত ক্লায়েন্ট কোটেশন জেনারেট করবে, সবার ফোন নম্বর, নাম ও বাজেট এখানে জমা হবে।
   - **১-ক্লিকে WhatsApp বাটন:** সরাসরি ক্লায়েন্টের হোয়াটসঅ্যাপে মেসেজ পাঠিয়ে ডিল ফাইনাল করার সুবিধা।
3. **Contact Form Inquiries:**
   - কন্টাক্ট ফরম থেকে আসা মেসেজগুলো সরাসরি দেখুন, কল বা ইমেইলের মাধ্যমে উত্তর দিন।
4. **Client Reviews & Videos:**
   - নতুন রিভিউ যুক্ত ও অনুমোদন করা।
   - ক্লায়েন্টদের ইউটিউব ইন্টারভিউ ভিডিও লিংক যুক্ত করা।
5. **Website Settings (Global):**
   - ফোন নম্বর বা অফিসিয়াল হোয়াটসঅ্যাপ নম্বর পরিবর্তন করলে ওয়েবসাইটের সব ফ্লোটিং বাটন ও ফুটারে সাথে সাথে রিয়েল-টাইমে আপডেট হয়ে যাবে!

---

## 🛠️ সাধারণ সমস্যার সমাধান (Troubleshooting)
- **MongoDB Error:** MongoDB Atlas-এর Network Access-এ `0.0.0.0/0` (Anywhere) আইপি অনুমোদিত আছে কিনা এবং পাসওয়ার্ডে কোনো স্পেশাল ক্যারেক্টার সমস্যা করছে কিনা চেক করুন।
- **Page Refresh 404:** `server/index.js`-এ বিল্ট-ইন ফলব্যাক কোড যুক্ত করা আছে, যা সিঙ্গেল পেজ অ্যাপ্লিকেশনের সব রাউট অটোমেটিক `dist/index.html`-এ রিডাইরেক্ট করে।
- **Port Conflict:** Hostinger স্বয়ংক্রিয়ভাবে নির্ধারিত পোর্ট সরবরাহ করে; সার্ভার স্ক্রিপ্ট `process.env.PORT || 5000` ব্যবহার করে স্বয়ংক্রিয়ভাবে যেকোনো পোর্টে চলতে সক্ষম।
