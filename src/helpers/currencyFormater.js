function IDRFormater( input ) {
    return input.toLocaleString("id-ID");
}

function AssetFormater( input, asset ) {
    const CFORMAT = new Intl.NumberFormat('de-DE', { style: 'currency', currency: asset })
    return CFORMAT.format(input) 
}

module.exports = { IDRFormater, AssetFormater}