import ioredis from 'ioredis';
import {config} from 'dotenv';
config();


const redisClient = new ioredis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    maxRetriesPerRequest:null,
})

redisClient.on('connect', () => {
  console.log("Redis connected");
});

redisClient.on('error', (err) => {
  console.log("Redis error:", err);
});

export default redisClient;
















// import {createClient} from 'redis';
// import { config } from 'dotenv';
// config();

// const redisClient = createClient({
//     url:`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
// })

// redisClient.on('connect',()=>{
//     console.log("redis connected");
// })

// redisClient.on('error',(err)=>{
//     console.log("redis failed to connect",err);
// })

// await redisClient.connect();

// export default redisClient;
