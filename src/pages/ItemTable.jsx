import React from 'react'

const ItemTable = ({ items, totalValue }) => {
    console.log("IN ItemTable: ", { items, totalValue });

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Sum</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        items.map(i => (
                            <tr key={i.id}>
                                <th>{i.title}</th>
                                <td>{i.quantity}</td>
                                <td>{i.price}</td>
                                <td>{(i.price * i.quantity).toFixed(2)}</td>
                            </tr>

                        ))
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="3" className="text-right">Total Value:</th>
                        <td>${totalValue.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default ItemTable
