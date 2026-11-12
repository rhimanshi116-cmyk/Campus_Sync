#!/usr/bin/env python3
"""
Automated ZIP Packager & Internal Code Metadata Generator for CampusSync
Generates:
  1. BUILD_INFO.json (Root & inside ZIP)
  2. VERSION_INFO.txt (Root & inside ZIP)
  3. src/data/buildInfo.json (Used by React UI to display live code date)
  4. public/campus-sync-project.zip & dist/campus-sync-project.zip
"""
import zipfile
import os
import json
import shutil
from datetime import datetime, timezone

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
public_dir = os.path.join(root_dir, 'public')
dist_dir = os.path.join(root_dir, 'dist')
src_data_dir = os.path.join(root_dir, 'src', 'data')

os.makedirs(public_dir, exist_ok=True)
os.makedirs(src_data_dir, exist_ok=True)

now_dt = datetime.now(timezone.utc)
iso_timestamp = now_dt.strftime("%Y-%m-%dT%H:%M:%SZ")
formatted_date = now_dt.strftime("%B %d, %Y")
formatted_time = now_dt.strftime("%H:%M:%S UTC")

# 1. Generate BUILD_INFO.json
build_metadata = {
    "project": "CampusSync - Campus & Club Event Management System",
    "version": "1.3.0",
    "internalCodeDate": formatted_date,
    "internalCodeTime": formatted_time,
    "buildTimestamp": iso_timestamp,
    "environment": {
        "node": "v22.x",
        "react": "19.0",
        "vite": "8.x",
        "tailwind": "4.x"
    },
    "database": {
        "file": "database.sql",
        "compatibility": ["MySQL 8.0+", "MariaDB", "PostgreSQL", "phpMyAdmin"],
        "tables": [
            "users",
            "clubs",
            "events",
            "event_registrations",
            "event_feedback",
            "announcements"
        ],
        "seedRecords": {
            "users": 3,
            "clubs": 6,
            "events": 6,
            "registrations": 3,
            "feedback": 1,
            "announcements": 2
        }
    },
    "authentication": {
        "type": "Single Sign-On (SSO)",
        "method": "Institutional Directory ID"
    }
}

build_info_path = os.path.join(root_dir, 'BUILD_INFO.json')
with open(build_info_path, 'w', encoding='utf-8') as f:
    json.dump(build_metadata, f, indent=2)

# 2. Write to src/data/buildInfo.json for UI access
ui_build_info_path = os.path.join(src_data_dir, 'buildInfo.json')
with open(ui_build_info_path, 'w', encoding='utf-8') as f:
    json.dump(build_metadata, f, indent=2)

# 3. Generate VERSION_INFO.txt
version_info_path = os.path.join(root_dir, 'VERSION_INFO.txt')
version_text = f"""================================================================================
CAMPUSSYNC - CAMPUS & CLUB EVENT MANAGEMENT SYSTEM
INTERNAL CODE DATE & PACKAGE METADATA
================================================================================
Internal Code Date : {formatted_date}
Internal Code Time : {formatted_time}
Build Timestamp    : {iso_timestamp}
Package Version    : v1.3.0-stable
Institution        : Apex Institute of Technology
Department         : Office of Student Affairs & Campus Life

INCLUDED FILES & ARCHITECTURE:
--------------------------------------------------------------------------------
1. database.sql
   - Complete Relational SQL Schema (DDL) and initial seed data (DML)
   - Compatible with MySQL, MariaDB, XAMPP, WAMP, and phpMyAdmin
   - Contains: users, clubs, events, event_registrations, event_feedback, announcements

2. PROJECT_README.md
   - Comprehensive local setup instructions (Node.js & XAMPP guide)
   - Database import walkthrough for MySQL & phpMyAdmin
   - Credentials list for Student, Faculty, and Admin demo tiers

3. BUILD_INFO.json
   - Machine-readable release metadata with timestamps, table counts, and environment details

4. Full Application Source Code:
   - src/components/   : Role portals (Student, Faculty, Admin), QR Passes, Certificates
   - src/context/      : State store with password-protected authentication & persistence
   - src/types/        : TypeScript interface models
   - src/data/         : Mock event and club database
   - server.ts         : Production Node.js/Express server
   - vite.config.ts    : Vite bundler configuration
   - package.json      : NPM package dependencies and scripts

DEFAULT AUTHENTICATION (CAMPUS DIRECTORY SSO):
--------------------------------------------------------------------------------
- Student Portal    : aarav.sharma@apex.edu.in    / 22BCSE104    [Campus SSO Verified]
- Faculty Portal    : sunita.rao@apex.edu.in      / EMP-FAC-042  [Campus SSO Verified]
- Dean / Admin      : dean.studentaffairs@apex.edu.in / EMP-ADM-001 [Campus SSO Verified]

================================================================================
Generated automatically during project packaging.
================================================================================
"""
with open(version_info_path, 'w', encoding='utf-8') as f:
    f.write(version_text)

# 4. Create ZIP archive
output_zip_public = os.path.join(public_dir, 'campus-sync-project.zip')
output_zip_dist = os.path.join(dist_dir, 'campus-sync-project.zip')

exclude_dirs = {'node_modules', 'dist', '.git', '.cache', '__pycache__'}
exclude_files = {'campus-sync-project.zip', 'bun.lock'}

files_added = 0
with zipfile.ZipFile(output_zip_public, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for foldername, subfolders, filenames in os.walk(root_dir):
        # Prune excluded directories
        subfolders[:] = [d for d in subfolders if d not in exclude_dirs]
        for filename in filenames:
            if filename in exclude_files or filename.endswith('.zip') or filename.endswith('.pyc'):
                continue
            filepath = os.path.join(foldername, filename)
            arcname = os.path.relpath(filepath, root_dir)
            zipf.write(filepath, arcname)
            files_added += 1

# Mirror to dist if dist exists
if os.path.exists(dist_dir):
    shutil.copy2(output_zip_public, output_zip_dist)

size_bytes = os.path.getsize(output_zip_public)
print(f"[{iso_timestamp}] CampusSync ZIP Package updated successfully:")
print(f"  -> Total files included: {files_added}")
print(f"  -> Internal Code Date : {formatted_date} ({formatted_time})")
print(f"  -> Archive size       : {size_bytes} bytes")
