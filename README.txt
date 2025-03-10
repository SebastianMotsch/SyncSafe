SyncSafe USER MANUAL and USER GUIDE

1. INTRODUCTION

SyncSafe is your reliable partner for public Wi-Fi protection and IoT security. Given the increase in cyber threats, knowing security procedures and weaknesses is essential to protecting your personal data.
 SyncSafe offers:
 - Insights into best practices in cybersecurity.
 - A scanner tool for examining the security of IoT devices.
 - A thorough lexicon to raise user awareness.
 This document, which covers installation, usage, troubleshooting, and frequently asked questions, functions as both a user manual and a user guide.

2. SYSTEM REQUIREMENTS AND INSTALLATION

Minimum Requirements for Software and Hardware: Operating System: Linux, macOS, or Windows 10+
 - RAM: 4GB at minimum; 8GB or more is advised.
 - Storage: 500MB or more of free space
 - Browser: the most recent iteration of Edge, Firefox, or Chrome
 - Database: PostgreSQL (for processing and storing data)
 Installation Instructions: 
 - Visit the official website to download SyncSafe.
 - Install PostgreSQL as a dependency for database functionality.
 - Launch the Setup Wizard and adhere to the prompts displayed on the screen.
 - Log in or create an account.
 - You can now utilize SyncSafe!

3. NAVIGATING THE SYNCSAFE INTERFACE

There are five primary pages on SyncSafe:
 INFO
 - Offers best practices and general cybersecurity insights.
 - Explains how to prevent attacks and common vulnerabilities.
 SCANNER
 - Enables users to upload Excel-formatted datasets of IoT devices.
 - For analysis, data is kept in an SQL database.
 - Users can view security alerts and filter the data.
 - Shows critical security information, vulnerabilities, and device alerts.
 FAQs
 - Answers to frequently asked questions by users.
 - Outlines how to troubleshoot common problems.
 SERVICES
 - Extra resources and tools to improve security.
 - Links to IoT protection partner services.
 CONTACT
 - Shows the contact information for developers and customer service.
 - Contains a form for user questions.

4. USING THE SCANNER

Step 1: Dataset Upload 
 - The "Upload Dataset" button should be clicked. 
 - Choose an IoT device data file in.xlsx or.csv format.
 - The SQL database contains the dataset.
Step 2: Establishing a Database Connection
 - From the list, pick the uploaded dataset.
 - Click "Connect" to view the data that has been stored.
Step 3: Data Filtering 
 - To examine device vulnerabilities, apply security filters.
 - The database receives a new upload of the filtered dataset.
Step 4: Results Viewing Device Alerts are warnings for possibly compromised devices that are displayed on the scanner page.
 - Vulnerabilities: Security threats were identified.
 - Crucial Information: Security advice and insights.

5. EXAMPLE INPUTS AND OUTPUTS

Example Input: 

Device NameIP AddressSecurity Level
SmartCam 192.168.1.10 Medium 
RouterX 192.168.1.1 High 
SmartPlug 192.168.1.25 Low

An example of output:
 - "SmartPlug - High-Risk Device Detected" is the device alert.
 - "RouterX - Outdated Firmware" is a vulnerability.
 - "SmartCam - Change Default Passwords" is a security insight.

6. TROUBLESHOOTING AND FAQs

Common Errors & Solutions:
File upload failed - Ensure the file is in .xlsx or .csv format.
Database connection error - Check internet connection and database credentials.
No vulnerabilities found - Verify dataset structure and content.

FAQs:
How do I interpret risk levels?
 - Green: Low risk, minor recommendations.
 - Yellow: Medium risk, moderate concerns.
 - Red: High risk, immediate attention needed.
What should I do if my device has a high-risk alert?
 - Update firmware and change default passwords.
 - Disable unnecessary features and monitor network activity.
How often should I scan my devices?
 - Recommended every two weeks or when connecting to new networks.

7. CONTACT SUPPORT

For technical support or additional inquiries:
 - Phone: +1 (800) 123 4567
 - Email: support@syncsafe.com
 - Website: www.syncsafe.com
 - Community Forum: forum.syncsafe.com

Thank you for using SyncSafe - Stay Secure!

DATASETS:

https://www.kaggle.com/datasets/fanbyprinciple/iot-device-identification?resource=download

FILE ORGANIZATION:

/SyncSafe-Project
|-- /backend                # Backend services and server-side logic
|   |-- /datasets           # Data storage or preprocessing files
|   |-- /node_modules       # Installed backend dependencies
|   |-- /routes             # API route definitions
|   |-- .env                # Environment variables (e.g., credentials)
|   |-- db.js               # PostgreSQL database connection logic
|   |-- package.json        # Backend dependencies and metadata
|   |-- package-lock.json   # Dependency version lock
|   |-- server.js           # Main Node.js server file
|
|-- /frontend               # React frontend application
|   |-- /Bio                # About us section content
|   |-- /node_modules       # Installed frontend dependencies
|   |-- /public             # Static files (HTML, images, favicons)
|   |-- /src                # Source code for the React application
|   |   |-- /assets         # Static assets (logos, icons, images)
|   |   |-- App.js          # Root component of the React app
|   |-- .gitignore          # Files to exclude from Git
|   |-- eslint.config.js    # ESLint configuration for code linting
|   |-- index.html          # Main HTML file for the React app
|   |-- package.json        # Frontend dependencies and metadata
|   |-- package-lock.json   # Dependency version lock
|   |-- vite.config.js      # Vite configuration for the React project
|   | README.md           # Frontend project documentation