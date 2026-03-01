export class RepositorioGenerico<T> {
    protected lista: T[] = [];

    agregar(item: T): void {
        this.lista.push(item);
    }

    obtenerTodos(): T[] {
        return this.lista;
    }

    eliminar(indice: number): void {
        this.lista.splice(indice, 1);
    }
}