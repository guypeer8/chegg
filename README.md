# Chegg Twitter / Guy Peer

## 🚀 In order to run the application:
1. Install dependencies:
```bash
    npm install  
```
2. Build the react frontend:
```bash
    npm run build  
```
3. Run the node server:
```bash
    npm run serve
```

4. [Click here](http://localhost:8001). 

## ✅ To run the tests please type:
```bash
    npm test 
```

## 🤔 Assumptions & Clarifications:
1. **_.env_** file would usually be git ignored, did not ignore it for the sake of your convenience guys.
2. Rate limiting & request slow downs are implemented naively using requester's ip address in-memory. For production, I would probably use a data store (remote server memory or disk).
3. The account and followers data is cached on the server RAM. In a production use case, the caching would have been implemented in a more sophisticated way, if needed.
