# Firebase Setup Guide for Pohang Sudal

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Name it: `pohang-sudal`
4. Disable Google Analytics (not needed for now)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In Firebase console, click "Build" → "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select region: `asia-northeast3` (Seoul)

## Step 3: Get Web App Config

1. In Firebase console, click the gear icon → "Project settings"
2. Scroll down to "Your apps" → Click web icon `</>`
3. Name it: `pohang-sudal-web`
4. Copy the config values

## Step 4: Set Environment Variables

Copy `.env.local.example` to `.env.local` and fill in values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your Firebase config values.

## Step 5: Firestore Security Rules (for production)

Go to Firestore → Rules and set:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create survey and booking entries
    match /surveys/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    match /bookings/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

This allows visitors to submit forms but prevents reading others' data.
