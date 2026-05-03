import {Queue} from 'bullmq';
import redisClient from '../lib/redis.js';

export const queue = new Queue('sendingPresciption',{
    connection:redisClient
})
