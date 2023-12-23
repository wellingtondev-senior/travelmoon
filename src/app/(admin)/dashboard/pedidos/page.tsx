'use client'

// Components
import { Table } from '@/app/components/Table'

// Services
import { useFetchClient } from '@/app/hooks/useFetchClient'

// Utils
import { DateFormat } from '@/app/utils'

export default function Pedidos() {
    const { data } = useFetchClient('admin/trip-leads')

    const dataTable = data?.data.map((item : any) => ({
        email: item.email,
        titulo: item.title,
        mensagem: item.message,
        data: DateFormat(item.created_at, 'yyyy-MM-dd HH:mm:ss', 'dd/MM/yyyy')
    }))

    return (
        <div>
            <h1 className='text-sm md:text-2xl text-black-300 mb-16'>Leads</h1>

            {dataTable && <Table data={dataTable} />}       
        </div>
    )
}
