export default (path) => {
    return ("https://cors-anywhere.herokuapp.com/http://ec2-54-179-226-46.ap-southeast-1.compute.amazonaws.com:8088"+path)
}

//https://cors-anywhere.herokuapp.com/http://ec2-54-179-226-46.ap-southeast-1.compute.amazonaws.com:8088

export const headers = {
            "Content-Type": "application/json",
            "Accept-Type": "application/json",
            "mode": "no-cors"
}
