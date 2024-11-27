export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    categoria: string;
    marca: string;
    fornecedorId: number;
    precoCusto: number;
    precoVenda: number;
    tamanho: string;
    cor: string;
    material: string;
    quantidadeEstoque: number;
    imagem: string;
}
  
export interface Fornecedor {
    id: number;
    nome: string;
    cnpj: string;
    endereco: string;
    telefone: string;
    email: string;
    contato: string;
}

export interface MovimentoEstoque {
    id: number;
    dataMovimento: string;
    quantidade: number;
    tipoMovimento: string;
    produtoId: number;
    pedidoId: number;
    vendaId: number;
}

export interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    endereco: string;
    telefone: string;
}

export interface PedidoProduto {
    id: number;
    quantidade: number;
    produtoId: number;
    pedidoId: number;
}

export interface PedidoCompra {
    id: number;
    dataPedido: string;
    dataEntregaPrevista: string;
    status: string;
    fornecedorId: number;
    produtos: {
      produtoId: number;
      quantidade: number;
    }[];
  }
  
  export interface Venda {
    id: number;
    dataVenda: string;
    clienteId: number;
    vendedor: string;
    formaPagamento: string;
    produtos: {
      produtoId: number;
      quantidade: number;
    }[];
  }

export interface VendaProduto {
    id: number;
    quantidade: number;
    produtoId: number;
    vendaId: number;
}