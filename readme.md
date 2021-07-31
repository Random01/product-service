# Development
1. "npm i"
2. "npm run build:watch"
3. "npm run start:watch"
4. to create a local data base run the following commands:
   * "cd /db-creation"
   * "node products-create-table.js" 
   * "node products-load-sample-data.js"

# Production
1. "npm i"
1. "npm run build"
1. "docker build . -t falserandom/product-service"
1. "docker run -p 49160:3001 -d falserandom/product-service"

# Redis
1. "docker pull redis"
2. "docker run -p 6379:6379 -d redis"