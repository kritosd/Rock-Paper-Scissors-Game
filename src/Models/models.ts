
export const gameChoises: gameChoise[] = [
    {
        id: 3,
        sortId: 0,
        name: 'Rock',
        color: 'red',
        bet: 0,
        isWinner: false
    },
    {
        id: 2,
        sortId: 2,
        name: 'Scissors',
        color: 'red',
        bet: 0,
        isWinner: false
    },
    {
        id: 1,
        sortId: 1,
        name: 'Paper',
        color: 'green',
        bet: 0,
        isWinner: false
    },
];

export interface gameChoise {
    id: number;
    sortId: number,
    name: string;
    color: string;
    bet: number;
    isWinner: boolean;
}

export enum ResultState {
    WIN = 'WIN',
    TIE = 'TIE',
    LOSE = 'LOSE'
}

export enum gameState {
    SELECT = 1,
    CALCULATE = 2,
    RESULT = 3
}