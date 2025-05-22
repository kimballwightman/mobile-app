#!/bin/bash

# Ensure we have the UUID extension
echo "Creating UUID extension if it doesn't exist..."
supabase migration new create_uuid_extension
echo 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";' > ./supabase/migrations/$(ls -t ./supabase/migrations | head -1)

# Make the main migration script executable
echo "Setting up migration script..."
chmod +x ./supabase/migrations/20230101000000_create_tables.sql

# Reset and start local Supabase with migrations
echo "Starting Supabase with migrations..."
supabase start

# Check if Supabase started successfully
if [ $? -eq 0 ]; then
  echo "Supabase started successfully!"
  echo "Database tables created based on documentation."
  echo "Local API URL: http://localhost:54321"
  echo "Local Studio URL: http://localhost:54323"
  echo ""
  echo "Use 'supabase migration list' to see applied migrations"
else
  echo "Error starting Supabase. Please check the logs."
fi 