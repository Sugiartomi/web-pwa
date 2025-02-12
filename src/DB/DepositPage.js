export const DBNetworkList = [

    {
  
      id: 1520484,
  
      symbol: '1INCH',
  
      provider_id: 1,
  
      provider: 'Binance Inc',
  
      network: 'BSC',
  
      status: true,
  
      deposit_status: true,
  
      withdrawal_status: true,
  
      description: 'BNB Smart Chain (BEP20)'
  
    }
  
  ]

  export const DBDetailNetwork = {

    status: 'success',
  
    messages: 'Get Data Success',
  
    detail: {
  
      id: 1520484,
  
      id_assets: 180,
  
      deposit_status: true,
  
      fee_by_network: '1.01200000',
  
      max_withdrawal_by_network: '1000',
  
      min_confirmation: '15',
  
      min_deposit_by_network: '0',
  
      min_withdrawal_by_network: '2.024',
  
      network: 'BSC',
  
      network_desc: 'BNB Smart Chain (BEP20)',
  
      network_status: true,
  
      tag_name: '',
  
      tag_status: false,
  
      withdrawal_status: true,
  
      pricescale: '8',
  
      lp_wd_fee: '0.92',
  
      lp_status: true,
  
      addressregex: '^(0x)[0-9A-Fa-f]{40}$',
  
      addressrule: '',
  
      memoregex: '',
  
      digital_wallet: '0'
  
    },
  
    wallet: null,
  
    expired_status: false
  
  }


  export const DBDataAssetDeposit = {

    img_url: 'https://assets.digitalexchange.id/coin/1INCH.png',
  
    symbol: '1INCH',
  
    name: '1inch',
  
    color: '#000000',
  
    tag_name: null,
  
    amount: '92.34680000',
  
    amount_frozen: '0.00000000',
  
    address: null,
  
    address_extra: null,
  
    integrated_address: null,
  
    provider_id: '1'
  
  }


  export const DBBankList = [

    {
  
      code: '016',
  
      account_number: '0000000123',
  
      type: 'VA',
  
      image: 'maybank-2.png',
  
      symbol: 'MAYBANK',
  
      name: 'BII Maybank',
  
      min_deposit: '10000',
  
      max_deposit: '1000000000',
  
      fee: '3000'
  
    },
  
    {
  
      code: '00007',
  
      account_number: '666',
  
      type: 'RETAIL',
  
      image: 'logo_indomaret.png',
  
      symbol: null,
  
      name: 'Indomaret',
  
      min_deposit: '10000',
  
      max_deposit: '5000000',
  
      fee: '7500'
  
    },
  
    {
  
      code: '013',
  
      account_number: '93824692375535',
  
      type: 'VA',
  
      image: 'logo_permata.png',
  
      symbol: 'Permata Bank',
  
      name: 'Permata Bank',
  
      min_deposit: '10000',
  
      max_deposit: '999999999',
  
      fee: '0'
  
    },
  
    {
  
      code: '008',
  
      account_number: '0000000123',
  
      type: 'VA',
  
      image: 'logo_mandiri.png',
  
      symbol: 'Mandiri',
  
      name: 'Bank Mandiri Tbk',
  
      min_deposit: '10000',
  
      max_deposit: '2000000000',
  
      fee: '3000'
  
    },
  
    {
  
      code: '002',
  
      account_number: '0000000123',
  
      type: 'VA',
  
      image: 'logo_bri.png',
  
      symbol: 'BRI',
  
      name: 'Bank BRI',
  
      min_deposit: '10000',
  
      max_deposit: '2000000000',
  
      fee: '3000'
  
    }
  
  ]