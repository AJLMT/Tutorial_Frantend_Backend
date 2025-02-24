import { PrestamosPage } from "../model/PrestamosPage";

export const PRESTAMOS_DATA : PrestamosPage = {
  content:[
    { id: 1, game_name: 'On Mars', client_name: 'Cliente 1', ini: new Date("11/09/2025"), end:new Date("12/09/2025") },
    { id: 2, game_name: 'Matt Leacock', client_name: 'Cliente 2', ini: new Date("11/09/2025"), end:new Date("12/09/2025")},
    { id: 3, game_name: 'Keng Leong Yeo', client_name: 'Cliente 3', ini: new Date("11/09/2025"), end:new Date("12/09/2025")},
    { id: 4, game_name: 'Gil Hova', client_name: 'Cliente 2', ini: new Date("11/09/2025"), end:new Date("12/09/2025")},
    { id: 5, game_name: 'Kelly Adams', client_name: 'Cliente 1', ini: new Date("11/09/2025"), end:new Date("12/09/2025}")},
],
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [{ property: 'id', direction: 'ASC' }],
    },
    totalElements: 5,
};
