import Aside from "../../../Aside/Aside";
import TableProducts from "./TableProducts";

export default function ListProductsSeller() {
    return (
        <div className="flex min-h-screen">
            <Aside />
            <main className="flex-1 p-6 overflow-auto">
                <TableProducts />
            </main>
        </div>
    );
}