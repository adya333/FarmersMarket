#!/bin/bash

# Configuration
BACKUP_DIR="/mnt/c/Users/windows 11/Documents/backups/frontend_archives"
PROJECT_DIR="/mnt/c/Users/windows 11/Downloads/practice/Sprint1/FarmersMarket"
LOG_FILE="$HOME/frontend_archive.log"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ARCHIVE_NAME="frontend_backup_${TIMESTAMP}.tar.gz"

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR" || {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ERROR: Failed to create backup directory" >>"$LOG_FILE"
    exit 1
}

# Logging function
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >>"$LOG_FILE"
}

log_message "Starting backup process"

# Create archive
if tar -czf "$BACKUP_DIR/$ARCHIVE_NAME" -C "$PROJECT_DIR" .; then
    log_message "Backup created: $ARCHIVE_NAME"
else
    log_message "ERROR: Failed to create backup archive"
    exit 1
fi

# Cleanup old backups (older than 30 days)
find "$BACKUP_DIR" -name "frontend_backup_*.tar.gz" -mtime +30 -delete
log_message "Cleaned up old backups"

log_message "Backup process completed successfully"
exit 0
