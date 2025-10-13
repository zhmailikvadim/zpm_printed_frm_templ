sap.ui.define(['sap/m/MessageToast'], function (MessageToast) {
  'use strict';

  return {
    onInit: function (oEvent) {
      this.extensionAPI.attachPageDataLoaded(this.onDetailsLoaded.bind(this), this);
    },
    onDetailsLoaded: function (event, this1) {
      var controlAttachmentGenerated = this.getView().byId(
        sap.ui
          .getCore()
          .byFieldGroupId('')
          .find((element) => element.sId.includes('AttachmentsGenerated')).sId,
      );

      var oView = this.getView();
      var oBindingContext = oView.getBindingContext();

      if (!event.context.getObject().uuid) {
        controlAttachmentGenerated.setVisible(false);
      } else {
        if (!event.context.getObject().uuid_char) {
          oView
            .getModel()
            .setProperty(
              'uuid_char',
              oBindingContext.getProperty('uuid').replace(/-/g, '').toUpperCase(),
              oBindingContext,
            );
        }
        controlAttachmentGenerated.setVisible(true);
      }
    },
    override: {
      onAfterActionExecution: function (sActionName, aSelectedContexts, oResponse) {
        if (sActionName === 'YourActionName') {
          // Custom logic after BOPF action
          sap.m.MessageToast.show('Action executed successfully!');
          this.extensionAPI.refresh(); // Refresh UI if needed
        }
      },
    },
  };
});
