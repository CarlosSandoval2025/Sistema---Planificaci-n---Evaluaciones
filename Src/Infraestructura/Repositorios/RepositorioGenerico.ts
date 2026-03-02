export class RepositorioGenerico<T> {

    protected lista: T[] = [];

    agregar(item: T): void {
        this.lista.push(item);
    }

    obtenerTodos(): T[] {
        return this.lista;
    }

    buscarPorId(id: number): T | undefined {
        return this.lista.find((e: any) => e.getId() === id);
    }

    eliminar(id: number): void {

        const index = this.lista.findIndex((e: any) => e.getId() === id);

        if(index === -1) {
            throw new Error("No se encontro el elemento a eliminar.");
        }

        this.lista.splice(index, 1);
    }
}