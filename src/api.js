export default (path) => {
    return ("https://thingproxy.freeboard.io/fetch/http://ec2-13-212-152-90.ap-southeast-1.compute.amazonaws.com:8088"+path)
}

//http://ec2-54-179-226-46.ap-southeast-1.compute.amazonaws.com:8088

export const headers = {
            "Content-Type": "application/json",
            "Accept-Type": "application/json",
            "mode": "no-cors"
}
