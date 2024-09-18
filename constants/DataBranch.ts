interface DataBranch {
    logo: any
    name: string
  }
  
  const dataBranch: DataBranch[] = [
    {
      logo: require('~/assets/images/iconNike.png'),
      name: 'Nike'
    },
    {
      logo: require('~/assets/images/iconPuma.png'),
      name: 'Puma'
    },
    {
      logo: require('~/assets/images/iconAdidas.png'),
      name: 'Adidas'
    },
    {
      logo: require('~/assets/images/iconConverse.png'),
      name: 'Converse'
    },
    {
      logo: require('~/assets/images/iconUnderAmour.png'),
      name: 'Under Armour'
    }
  ]
  export default dataBranch