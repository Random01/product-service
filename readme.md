1. "npm i"
1. "npm run build:watch"
1. "npm run start:watch"
1. to create a local data base run the following commands:
   * "cd /db-creation"
   * "node products-create-table.js" 
   * "node products-load-sample-data.js"

2. "npm i"
3. "npm run build"
4. "docker build . -t falserandom/product-service"
5. "docker run -p 49160:3001 -d falserandom/product-service"
