import { X } from "lucide-react";
import { use } from "react";
import { OrderContext } from "@/providers/order";
import {calculateTotalOrder} from "@/lib/helper"

export function ModalOrder() {
  const { onRequestClose, order, finishOrder } = use(OrderContext);

  async function handleFinishOrder(){
await finishOrder(order[0].order.id)
  }
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black/50 z-[999] overflow-auto flex justify-center items-center p-0 backdrop-blur">
      <section className="bg-dark-900 text-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <button className="" onClick={onRequestClose}>
          <X size={40} color="#FF3f4b" />
        </button>

        <article className="text-center">
          <h2 className="text-2xl font-bold mb-2">Detalhes do pedido</h2>
          <span className="block mb-4">Mesa {order[0].order.table}</span>
          {
            order[0].order?.name && (
              <span className="block mb-4">Nome da mesa: {order[0].order.name}</span>
            )
          }

          {order.map((item) => (
            <section className="mb-4" key={item.id}>
              <span className="block">Qtd:{item.amount} - {item.product.name} - R$ {parseFloat(item.product.price) * item.amount}</span>
              <span className="block text-sm text-gray-400">
                {item.product.description}
              </span>
            </section>
          ))}

          <h3>Valor total: R$ {calculateTotalOrder(order)}</h3>

          <button onClick={handleFinishOrder} className="bg-dark-700 text-red-10 font-semibold py-2 px-4 rounded">
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  );
}
