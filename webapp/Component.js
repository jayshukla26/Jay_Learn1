sap.ui.define(["sap/ui/core/UIComponent",
			   "acc/fin/ar/models/model"], function(UIComponent,Models){
	return UIComponent.extend("acc.fin.ar.Component",{ 
		metadata: {
			manifest: "json"
		},
		init: function(){
			UIComponent.prototype.init.apply(this);	
			var oRouter = this.getRouter();
			oRouter.initialize();
		},
		// createContent: function(){
		// 	var oAppView = new sap.ui.view({
		// 		viewName: "acc.fin.ar.view.App",
		// 		type: "XML"
		// 	});
			
		// 	//var oFruitModel = Models.createFruitModel();
		// 	//oAppView.setModel(oFruitModel);
			
		// 	var oView1 = new sap.ui.view("idView1",{
		// 		viewName: "acc.fin.ar.view.View1",
		// 		type: "XML"
		// 	});
		// 	var oView2 = new sap.ui.view("idView2",{
		// 		viewName: "acc.fin.ar.view.View2",
		// 		type: "XML"
		// 	});
			
		// 	var oEmpty = new sap.ui.view("idEmpty",{
		// 		viewName: "acc.fin.ar.view.Empty",
		// 		type: "XML"
		// 	});
			
		// 	var oAppCon = oAppView.byId("idAppCon");
			
		// 	//oAppCon.addPage(oView1);
		// 	//oAppCon.addPage(oView2);
		// 	oAppCon.addMasterPage(oView1);
			
		// 	oAppCon.addDetailPage(oEmpty);
		// 	oAppCon.addDetailPage(oView2);
		// 	return oAppView;
		// },
		destroy: function(){
			
		}
	});
});