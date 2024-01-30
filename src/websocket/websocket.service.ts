import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface User { id: string, isActive: boolean }

interface ConnectedClients {

    [id: string]: {
        socket: Socket,
        user: User
    },
}



@Injectable()
export class WebsocketService {

    users: User[] = [];

    private connectedClients: ConnectedClients = {}
    registerClient(client: Socket, userId: string) {

        this.users.push({

            id: userId,
            isActive: true,

        });

        const user = this.users.find(val => val.id === userId);

        if (!user) throw new Error('User not found');

        if (!user.isActive) throw new Error('User is not active!')

        this.checkUserConnection(user);

        this.connectedClients[client.id] = {
            socket: client,
            user
        };
    }

    removeClient(clientId: string) {
        delete this.connectedClients[clientId];
    }

    getConnectedClients(): string[] {
        return Object.keys(this.connectedClients);
    }

    getUserFullNameBySocketId(socketId: string) {
        return this.connectedClients[socketId].user.id;
    }

    private checkUserConnection(user: User) {
        for (const clientId of Object.keys(this.connectedClients)) {
            const connectedClient = this.connectedClients[clientId];
            if (connectedClient.user.id === user.id) {
                connectedClient.socket.disconnect();
                break;
            }
        }
    }

}
