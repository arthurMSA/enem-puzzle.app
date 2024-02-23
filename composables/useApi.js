
export default (route, options) => {
  const config = useRuntimeConfig()
  const response = useFetch(route, {
    ...options,
    headers: {
      'X-API-KEY': '123'
    },
    baseURL: config.public.apiUrl,
  })
  return response
}