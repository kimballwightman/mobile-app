#!/bin/bash

# Setup Neo4j Graph Database for NutriTech Mobile App
# This script runs the Cypher script to create the graph database

# Configuration
NEO4J_URI="neo4j+s://7778ad2c.databases.neo4j.io"
NEO4J_USERNAME=""
NEO4J_PASSWORD=""

# Prompt for credentials if not provided
if [ -z "$NEO4J_USERNAME" ]; then
  read -p "Enter Neo4j username: " NEO4J_USERNAME
fi

if [ -z "$NEO4J_PASSWORD" ]; then
  read -sp "Enter Neo4j password: " NEO4J_PASSWORD
  echo
fi

# Check if cypher-shell is installed
if ! command -v cypher-shell &> /dev/null; then
  echo "Error: cypher-shell is not installed or not in the PATH."
  echo "Please install it via 'brew install cypher-shell' or download from Neo4j website."
  exit 1
fi

echo "Connecting to Neo4j Aura instance at $NEO4J_URI..."

# Run the Cypher script
cypher-shell -a "$NEO4J_URI" -u "$NEO4J_USERNAME" -p "$NEO4J_PASSWORD" --format plain < ./setup_neo4j_graph.cypher

if [ $? -eq 0 ]; then
  echo "✅ Graph database setup completed successfully!"
  echo "The following nodes and relationships have been created:"
  echo "- User nodes with profile information"
  echo "- Recipe nodes with nutritional data"
  echo "- Food nodes with macro information"
  echo "- Tag nodes for categorization"
  echo "- UserSettings, UserPerformance, MealEvent, WorkoutEvent nodes"
  echo "- MealReview and ShoppingCart nodes"
  echo "- Relationships between all nodes based on the app's domain model"
  echo
  echo "You can now query the graph database through the Neo4j Browser at:"
  echo "https://console.neo4j.io/"
  echo
  echo "Sample query to explore the graph:"
  echo "MATCH path = (u:User {email: 'user1@example.com'})-[*1..2]-(n) RETURN path LIMIT 10;"
else
  echo "❌ Error setting up the graph database. Please check the error messages above."
fi 