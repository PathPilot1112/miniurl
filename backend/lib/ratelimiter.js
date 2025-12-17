import redis from "./redis.js";

export async function Ratelimiter(ip){
    const key = `rate.${ip}`

    const count = await redis.incr(key)

    if(count ==1){
        await redis.expire(key,60)
    }

    return count <=10

    
}