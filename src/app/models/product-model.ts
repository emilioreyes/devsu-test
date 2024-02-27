interface Product{
    id: string,
    name: string,
    description: string,
    logo: string,
    date_release: string,
    date_revision:string,
}

type ProductRequest=Pick<Product,"id"|"name"|"description"|"logo"|"date_release"|"date_revision">
type ProductResponse=Pick<Product,"id"|"name"|"description"|"logo"|"date_release"|"date_revision">

export {ProductRequest, ProductResponse}