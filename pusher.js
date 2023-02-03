import Pusher from "pusher";
import ClientPusher from 'pusher-js'

export const serverPusher=new Pusher({
    appId: "1540866",
    key: "4ed5fba6b39bf123abae",
    secret: "919e7de7151fbf10478e",
    cluster: "ap2",
})

export const clientPusher=new ClientPusher('4ed5fba6b39bf123abae', {
    cluster: 'ap2',
  })