
export default defineNuxtPlugin(() => {
    const token = useLocalStorage<string|null>('token', null)
    console.log('token', token.value)
    const $customFetch = $fetch.create({
        onRequest({options}) {
            console.log('onRequest token: ', token.value)
            if (token.value) {
                console.log('set token token: ', token.value)
                options.headers.set('Authorization', `Bearer ${token.value}`)
                options.headers.set('token', token.value)
            }
        }
    })

    return {
        provide: {
            customFetch: $customFetch
        }
    }
})
