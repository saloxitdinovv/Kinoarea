import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const getData = async (url) => {
    const res = await axios.get(BASE_URL + url, {
        headers: {
            Authorization: `Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwODhkZDM4MzdmYzk3NzY5OTA4NWVkM2E4NTIxMSIsInN1YiI6IjY1NTRjYWRjZWE4NGM3MTA5NDAwMDFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dTIivT2f1mMQIEEf-gxzHim7irgnQgmOS1sOOE0mZJg`
        }
    })
    return res.data
}

// export const postData = async (url, body) => {
//     try {
//         const res = await axios.post(BASE_URL + url, body)

//         return res
//     } catch (e) {
//         console.log(e);
//     }
// }

// export const removeData = async (url, id) => {
//     const res = await axios.delete(`${BASE_URL}${url}/${id}`)

//     return res
// }

// export const patchData = async (url, body) => {
//     const res = await axios.patch(BASE_URL + url, body)

//     return res
// }