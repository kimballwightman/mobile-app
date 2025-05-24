#!/usr/bin/env python3
"""
Simple script to run the example data loading workflow.
This will fetch and store data for:
- Recipe ID: 716429
- Ingredient ID: 11297
- Product ID: 12345
- Menu Item ID: 779721
"""

import asyncio
from prefect_workflows import load_example_data

if __name__ == "__main__":
    print("Starting example data load workflow...")
    asyncio.run(load_example_data())
    print("Workflow completed. Check the logs for details.") 