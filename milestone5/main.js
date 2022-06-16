/*

Milestone 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente 
(verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: 
tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

*/

const contatti = [
    {
        name: "Michele",
        avatar: "_1",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Hai portato a spasso il cane?",
                status: "sent",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Ricordati di stendere i panni",
                status: "sent",
            },
            {
                date: "10/01/2020 16:15:22",
                message: "Tutto fatto!",
                status: "received",
            },
        ],
    },
    {
        name: "Fabio",
        avatar: "_2",
        visible: true,
        messages: [
            {
                date: "20/03/2020 16:30:00",
                message: "Ciao come stai?",
                status: "sent",
            },
            {
                date: "20/03/2020 16:30:55",
                message: "Bene grazie! Stasera ci vediamo?",
                status: "received",
            },
            {
                date: "20/03/2020 16:35:00",
                message: "Mi piacerebbe ma devo andare a fare la spesa.",
                status: "sent",
            },
        ],
    },
    {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        messages: [
            {
                date: "28/03/2020 10:10:40",
                message: "La Marianna va in campagna",
                status: "received",
            },
            {
                date: "28/03/2020 10:20:10",
                message: "Sicuro di non aver sbagliato chat?",
                status: "sent",
            },
            {
                date: "28/03/2020 16:15:22",
                message: "Ah scusa!",
                status: "received",
            },
        ],
    },
    {
        name: "Alessandro B.",
        avatar: "_4",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Lo sai che ha aperto una nuova pizzeria?",
                status: "sent",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Si, ma preferirei andare al cinema",
                status: "received",
            },
        ],
    },
    {
        name: "Alessandro L.",
        avatar: "_5",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Ricordati di chiamare la nonna",
                status: "sent",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Va bene, stasera la sento",
                status: "received",
            },
        ],
    },
    {
        name: "Claudia",
        avatar: "_6",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Ciao Claudia, hai novità?",
                status: "sent",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Non ancora",
                status: "received",
            },
            {
                date: "10/01/2020 15:51:00",
                message: "Nessuna nuova, buona nuova",
                status: "sent",
            },
        ],
    },
    {
        name: "Federico",
        avatar: "_7",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Fai gli auguri a Martina che è il suo compleanno!",
                status: "sent",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Grazie per avermelo ricordato, le scrivo subito!",
                status: "received",
            },
        ],
    },
    {
        name: "Davide",
        avatar: "_8",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Ciao, andiamo a mangiare la pizza stasera?",
                status: "received",
            },
            {
                date: "10/01/2020 15:50:00",
                message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
                status: "sent",
            },
            {
                date: "10/01/2020 15:51:00",
                message: "OK!!",
                status: "received",
            },
        ],
    },
];

// @ts-ignore
new Vue ({
    el: '#app',

    data: {
        contacts: contatti,
        activeContact: undefined,
        currentSearch: undefined,
        actualMessage: '',
        isTyping : false,
    },

    methods: {
        setActiveUser(contact){
            this.activeContact = contact;
            if (!this.activeContact.hasOwnProperty('lastOnline')){
                this.activeContact.lastOnline = contact.messages.filter(message=>message.status === 'received').at(-1).date
            }
        },

        sendMessage(message){

            if (message.trim() === ''){
                return
            }
            this.activeContact.messages.push({
                // @ts-ignore
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                message: message,
                status: "sent"
            })

            this.isTyping = 'Sta scrivendo...';
            this.actualMessage = '';

            const contactToPush = this.activeContact

            setTimeout(()=>{
                contactToPush.messages.push({
                    // @ts-ignore
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    message: 'Ok!!',
                    status: "received"
                });

                this.isTyping = 'Online';
            }, 1000)

            setTimeout(()=>{
                this.isTyping = false;
                // @ts-ignore
                this.activeContact.lastOnline = dayjs().format('DD/MM/YYYY HH:mm:ss')
                
            }, 3000)
        },

        returnFilterContacts(){

            if (this.currentSearch == null || this.currentSearch == undefined){
                return this.contacts
            }
            return this.contacts.filter((contact)=> {
                const lowerName = contact.name.toLowerCase();
                const lowerSearch = this.currentSearch.toLowerCase();

            return lowerName.includes(lowerSearch)
            })

        
        },

        deleteMessage(toRemove){
            const searchMessageIndex = this.activeContact.messages.findIndex(object => {
                return object.date == toRemove.date;
            })

            this.activeContact.messages.splice(searchMessageIndex, 1)
            
        },

        removeCurrentSearch(){
            this.currentSearch = null
        },

        printOnlyHour(string){
            return string.slice(11)
        },

        deleteMessages(){
            this.activeContact.messages = []
        }

    }
})