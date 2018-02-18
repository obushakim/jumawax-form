Ext.define('suwe.store.PJPFormStore', {
    extend: 'Ext.data.Store',

    requires: [ 'Ext.data.proxy.JsonP' ],
    config: {
        fields: [ 'pjpId', 'storeCode', 'skuId', 'collectDtm', 'oosPromo', 'oos', 'msg', 'catalogueId' ],
        autoDestroy: true,

        proxy: {
            type: 'jsonp',
            url: 'http://192.168.1.100:8080/jumawax-web/visit/plan/oos',
            callbackKey: 'callback'
        },
        listeners : {
            beforeload: function(store, eOpts){

            },
            load: function(store, eOpts) {
                console.log('SKUStore data= ' + store.getCount());
            }
        }
    }
});