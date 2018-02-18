Ext.define('suwe.view.Main', {
    extend: 'Ext.form.Panel',
    xtype: 'main',
    requires: [
        'Ext.Button',
        'Ext.Img',
        'Ext.form.FieldSet',
        'Ext.field.Select'
    ],
    config: {
        title: 'Form',
        baseCls: 'x-show-contact',
        scrollable: true,
        layout: {
            type:"vbox"
            // pack:"center",
            // align:"center"
        },
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: 'Native API Examples'
        },
        {
            xtype: 'fieldset',
            title: 'Data PJP',
            id: 'PJPFieldset',
            defaults: {
              labelAlign: 'top'
            },              
            items: [
                {
                    xtype: 'selectfield',
                    id: 'itemStoreField',
                    name: 'itemAvail',
                    label: 'Apakah item tersedia?',
                    options: [
                        {
                            text: '-- Pilih --',
                            disabled: true
                        },
                        {
                            text: 'Ya',
                            value: 1
                        },
                        {
                            text: 'Tidak',
                            value: 0
                        }
                    ]
                },
                {
                    xtype: 'selectfield',
                    id: 'promoField',
                    name: 'promoAvail',
                    label: 'Apakah item memiliki promo?',
                    options: [
                        {
                            text: '-- Pilih --',
                            disabled: true
                        },
                        {
                            text: 'Ya',
                            value: 1
                        },
                        {
                            text: 'Tidak',
                            value: 0
                        }
                    ],
                    showAnimation: {
                        type: 'fade',
                        duration: 2000
                    },
                    hideAnimation: {
                        type: 'fadeOut',
                        duration: 2000
                    }
                },
                {
                    xtype: "image",
                    id: 'promoCameraPreview',
                    src: "http://placehold.it/200x200",
                    width: '100%',
                    height: '100px',
                    showAnimation: {
                        type: 'fade',
                        duration: 2000
                    },
                    hideAnimation: {
                        type: 'fadeOut',
                        duration: 2000
                    }
                },
                {
                    xtype: "button",
                    id: 'promoCamera',
                    text: "Take Photo",
                    showAnimation: {
                        type: 'fade',
                        duration: 2000
                    },
                    hideAnimation: {
                        type: 'fadeOut',
                        duration: 2000
                    },
                    handler: function(btn) {
                        var panel = btn.up('panel');

                        panel.getPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY, btn.getId());
                    }
                  },
                {
                    xtype: 'selectfield',
                    id: 'competitorField',
                    name: 'competitorAvail',
                    label: 'Apakah kompetitor memiliki promo?',
                    showAnimation: {
                        type: 'fade',
                        duration: 2000
                    },
                    hideAnimation: {
                        type: 'fadeOut',
                        duration: 2000
                    },
                    options: [
                        {
                            text: '-- Pilih --',
                            disabled: true
                        },
                        {
                            text: 'Ya',
                            value: 1
                        },
                        {
                            text: 'Tidak',
                            value: 0
                        }
                    ]
                },
                {
                    xtype: "image",
                    id: 'competitorCameraPreview',
                    src: "http://placehold.it/200x200",
                    width: '100%',
                    height: '100px',
                    showAnimation: {
                        type: 'fade',
                        duration: 2000
                    },
                    hideAnimation: {
                        type: 'fadeOut',
                        duration: 2000
                    }
                },
                {
                    xtype: "button",
                    id: 'competitorCamera',
                    text: "Take Photo",
                        showAnimation: {
                            type: 'fade',
                            duration: 2000
                        },
                        hideAnimation: {
                            type: 'fadeOut',
                            duration: 2000
                        },
                    handler: function(btn) {
                        var panel = btn.up('panel');

                        panel.getPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY, btn.getId());
                    }
                },
                {
                    xtype: 'selectfield',
                    name: 'otherShelfAvail',
                    label: 'Apakah item tersedia di rak lain?',
                    options: [
                        {
                            text: '-- Pilih --',
                            disabled: true
                        },
                        {
                            text: 'Ya',
                            value: 1
                        },
                        {
                            text: 'Tidak',
                            value: 0
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'button',
            itemId: 'PJPFormButton',
            text: 'Send',
            ui: 'confirm',
            handler: function() {
                var form = this.up('main'),
                    values = form.getValues(),
                    promoImage = Ext.getCmp('promoCameraPreview').getSrc(),
                    competitorImage = Ext.getCmp('competitorCameraPreview').getSrc();

                values.promoImg = promoImage;
                values.competitorImg = competitorImage;

                this.up('main').submit(values);
            }
        },
        {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                xtype: "button",
                text: "Photo Library",
                handler: function(btn) {
                    var panel = btn.up('panel');

                    panel.getPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY);
                }
            }, {
                xtype: "button",
                text: "Take Photo",
                handler: function(btn) {
                    var panel = btn.up('panel');

                    panel.getPhoto(navigator.camera.PictureSourceType.CAMERA);
                }
            }]
        }],
        listeners: {
            initialize: function(){ 
                var promoField = Ext.getCmp('promoField'),
                    itemStoreField = Ext.getCmp('itemStoreField'),
                    competitorField = Ext.getCmp('competitorField'),
                    promoCameraPrev = Ext.getCmp('promoCameraPreview'),
                    promoCamera = Ext.getCmp('promoCamera'),
                    competitorCameraPrev = Ext.getCmp('competitorCameraPreview');
                    competitorCamera = Ext.getCmp('competitorCamera');


                promoField.hide();
                promoCameraPrev.hide();
                promoCamera.hide();
                competitorField.hide();
                competitorCameraPrev.hide();
                competitorCamera.hide();

                itemStoreField.on('change', function(){
                    if(this.getValue() == 1){        
                        promoField.show();
                    } else {
                        promoField.hide();
                    }
                });

                promoField.on('change', function(){
                    competitorField.show()
                    if(this.getValue() == 1){
                        promoCamera.show();
                    } else {
                        promoCamera.hide();
                    }
                });

                promoCamera.on('tap', function(){
                    promoCameraPrev.show();
                });

                competitorField.on('change', function(){
                    if(this.getValue() == 1){
                        competitorCamera.show();
                    } else {
                        competitorCamera.hide();
                    }
                });

                competitorCamera.on('tap', function(){
                    competitorCameraPrev.show();
                });
            }
        
        }
    },
    getPhoto: function(source) {
        var me = this;
        
        navigator.camera.getPicture(me.success, me.failure, {
            quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: source 
        });
    },

    getPhoto: function(source, idCmp) {
        var me = this;

        navigator.camera.getPicture(
            function(imageData){
                me.successGetPicture(imageData, idCmp);
            }, me.failure, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: source 
            }
        );
    },

    successGetPicture: function(imageUri, idCmp){
        var img;

        if(idCmp == 'promoCamera'){
            img = Ext.ComponentQuery.query("#promoCameraPreview")[0],
            img.setSrc(imageUri);
        } else if (idCmp == 'competitorCamera'){
            img = Ext.ComponentQuery.query("#competitorCameraPreview")[0];
            img.setSrc(imageUri);
        } else {
            alert('error');
        }
    },

    submit: function(data){
        console.log(data);
        var me = this;
        var formStore =Ext.getStore('PJPFormStore');
        
        var currentDate = new Date();
        var loadStore = formStore.load({
            params: {
                pjpId: 125001, 
                storeCode: 'ALF1411', 
                skuId: '7777710', 
                collectDtm: currentDate,
                oosPromo: data.promoAvail, 
                oos: data.itemAvail,
                oosPartial: data.otherShelfAvail
            },
            callback : function(records, operation, success){
                if(records[0].data.msg == 'SUCCESS'){
                    if(data.promoImg || data.promoImg !== null){
                        me.uploadImage(data.promoImg, 1, data);
                    }

                    if(data.competitorImg || data.competitorImg !== null){
                        me.uploadImage(data.competitorImg, 2, data);
                    }
                }

            }
        });
        Ext.Msg.alert('List', 
            '<ul>' +
                '<li>' +'pjp id: 125001<li>' +
                '<li>' +'store code: ALE14114<li>' +
                '<li>' +'sku id: 7777710<li>' +
                '<li>' +'item Available: '+data.itemAvail+ '<li>' +
                '<li>' +'promo Available: '+data.promoAvail+ '<li>' +
                '<li>' +'competitor Available: '+data.competitorAvail+ '<li>' +
                '<li>' +'other Shelf Available: '+data.otherShelfAvail+ '<li>' +
                '<li>' +'promo image: '+data.promoImg+ '<li>' +
                '<li>' +'competitor image: '+data.competitorImg+ '<li>' +
            '</ul>'
        , Ext.emptyFn);              
    },

    uploadImage: function(imageUri, imageType, data){
        var ft = new FileTransfer();
        var options = new FileUploadOptions();

        options.headers= {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        };
        // options.fileName=imageUri.substr(imageUri.lastIndexOf('/')+1);
        options.fileKey = "file";
        options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1) + '-' + imageType + '-125001-7777710';
        var params = {};
        params.pjpId = "test";
        params.skuId = "param";

        options.params = params;

        ft.upload(
            imageUri, 
            encodeURI("http://192.168.1.100:8080/jumawax-web/file/upload"), 
            function(entry){
                Ext.Msg.alert('Title', 'SUKSES', Ext.emptyFn);
            }, 
            function(error){
                Ext.Msg.alert('Title', 'gagal', Ext.emptyFn);        
            }, 
            options
        );  
    },

    success: function(imageUri) {
        var imgPromo = Ext.ComponentQuery.query("#promoCameraPreview")[0],
            imgCompetitor = Ext.ComponentQuery.query("#competitorCameraPreview");
        imgPromo.setSrc(imageUri);

        document.addEventListener("deviceready", function(imageUri) {
                    Ext.Msg.confirm('Title', imageUri, Ext.emptyFn);
            var servPath = '192.168.1.100';
            window.cordova.plugin.ftp.connect(servPath, 'jumawax', 'jkluio789', function(ok) {
                window.cordova.plugin.ftp.upload('SD Card/DSC_0001.JPG', '/remoteFile.jpg', function(percent) {
                if (percent == 1) {
                    console.info("ftp: upload finish");
                } else {
                    console.debug("ftp: upload percent=" + percent * 100 + "%");
                }
            }, function(error) {
                console.error("ftp: upload error=" + error);
            });
            }, function(error) {
                // console.error("ftp: connect error=" + error);
            });
        }, false);
 

















        var options = new FileUploadOptions();
        options.fileKey="";
        options.fileName=imageUri.substr(imageUri.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = {};
        params.value1="test";
        params.value2="param";

        option.params= params;

        var ft = new FileTransfer();
        var url = encodeURI("");
        ft.upload(imageUri, url, win, fail, options);
    },

    onDeviceReady: function(imageUri) {
        window.alert("sometext");
        // First of all, connect to ftp server address without protocol prefix. e.g. "192.168.1.1", "ftp.xfally.github.io". 
        var servPath = '192.168.1.100';
        
        window.cordova.plugin.ftp.connect(servPath, 'jumawax', 'jkluio789', function(ok) {
            console.info("ftp: connect ok=" + ok);
     
            // You can do any ftp actions from now on... 
            // window.cordova.plugin.ftp.upload(imageUri, '/remotePath/remoteFile', function(percent) {
            //     if (percent == 1) {
            //         console.info("ftp: upload finish");
            //     } else {
            //         console.debug("ftp: upload percent=" + percent * 100 + "%");
            //     }
            // }, function(error) {
            //     console.error("ftp: upload error=" + error);
            // });
     
        }, function(error) {
            console.error("ftp: connect error=" + error);
        });
    },

    failure: function(message) {
        alert("Failed" + message);
    },

    win: function(r){
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    },

    fail: function(error){
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
});