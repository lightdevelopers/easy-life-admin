export default (path) => {
    return ("https://cors-anywhere.herokuapp.com/http://ec2-3-20-234-252.us-east-2.compute.amazonaws.com:8088"+path)
}

//https://cors-anywhere.herokuapp.com/http://ec2-3-23-63-206.us-east-2.compute.amazonaws.com:8088

export const headers = {
            "Content-Type": "application/json",
            "Accept-Type": "application/json",
            "mode": "no-cors"
}
