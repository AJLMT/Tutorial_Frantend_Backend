import { Pageable } from "../../core/model/page/Pageable";
import { Prestamos } from "./Prestamos";

export class PrestamosPage {
    content: Prestamos[];
    pageable: Pageable;
    totalElements: number;
}
