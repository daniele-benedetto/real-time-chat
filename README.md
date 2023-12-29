# Real time chat

## Descrizione del Progetto

Real time chat è un'applicazione web che permette di chattare in tempo reale con altri utenti all'interno di una chat room.

## Tecnologie Utilizzate

L'applicazione è stata sviluppata utilizzando Next.js 14, Redux Toolkit, Socket.io, Redis, Tailwind CSS e TypeScript.

## Requisiti
Hai bisogno di un database Redis per memorizzare i messaggi e le informazioni degli utenti. Vedi [redis.io](https://redis.io/) per maggiori informazioni.  

## Installazione

Assicurati di avere Node.js e npm installati sul tuo sistema.

1. Installa le dipendenze:

    ```bash
    npm install
    ```

2. Genera una chiave segreta per la firma dei JWT, ad esempio:

    ```bash
    openssl rand -hex 32
    ```

3. Crea un file `.env` nella radice del progetto e configuralo con le tue variabili d'ambiente:

    ```
    REDIS_HOST=redis-host
    REDIS_PORT=redis-port
    REDIS_PASSWORD=redis-password
    JWT_SECRET=jwt-secret
    ```

## Comandi

È necessario avviare il server e il client separatamente in due terminali diversi per poter utilizzare l'applicazione in modalità di sviluppo.

- `npm run dev`: Avvia il server in modalità di sviluppo per accedere al client web.
- `node server/server.js`: Avvia il server socket.io in modalità di sviluppo.