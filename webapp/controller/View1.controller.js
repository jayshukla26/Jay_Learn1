sap.ui.define([
	"acc/fin/ar/controller/BaseController"
], function(Controller) {
	"use strict";

	return Controller.extend("acc.fin.ar.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf acc.fin.ar.view.View1
		 */
			onInit: function() {
			//	this.oRouter = this.getOwnerComponent().getRouter();
			Controller.prototype.onInit.apply(this);
			},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf acc.fin.ar.view.View1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf acc.fin.ar.view.View1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf acc.fin.ar.view.View1
		 */
		//	onExit: function() {
		//
		//	}
		onNextItem: function(oEvent){
			var selectedItem = oEvent.getParameter("listItem");
			var sPath = selectedItem.getBindingContextPath();
			// var oParent = this.getView().getParent().getParent();
			// //var oView2 = oParent.getPages()[1];
			// var oView2 = oParent.getDetailPages()[1];
			// oView2.bindElement(sPath);
			var sIndex = sPath.split("/")[sPath.split("/").length - 1];
			this.onNext(sIndex);
		},
		onNext: function(fruitcode){
			//alert("under construction");
			// console.log(this.reusableMethod(5,3));
			// var oAppCon = this.getView().getParent().getParent();
			// oAppCon.toDetail("idView2");
			this.oRouter.navTo("detailproduct", {
				fruitid: fruitcode
			});
		},
		onSelectionChange: function(oEvent){
			var aSelItems = oEvent.getParameter("listItems");
			for(var i=0; i<aSelItems.length; i++){
				var oItem = aSelItems[i];
				console.log(oItem.getTitle());		
			}
		},
		OnDelete: function(oEvent){
				var oDelete = oEvent.getParameter("listItem");
				var oList = oEvent.getSource();
				oList.removeItem(oDelete);
		},
		onAdd: function(){
			this.oRouter.navTo("Add");
		},
		onSearch: function(oEvent){
			var sValue = oEvent.getParameter("query");
			if (!sValue){
				sValue = oEvent.getParameter("newValue");
			}
			var oList = this.getView().byId("myFruits");
			if	(sValue.indexOf("-") !== -1){
				// Read a single product
				var oDataModel = this.getView().getModel();
				oDataModel.read("/ProductCollection('" + sValue + "')", {
					success: function(data){
					var oDialog = new sap.m.Dialog({
						content: [
							new sap.ui.layout.form.SimpleForm({
								content: [
									new sap.m.Label({text: "ID"}),
									new sap.m.Text({text: data.PRODUCT_ID}),
									new sap.m.Label({text: "Name"}),
									new sap.m.Text({text: data.NAME}),
									new sap.m.Label({text: "Supplier"}),
									new sap.m.Text({text: data.SUPPLIER_NAME})
									]
							})
							],
							title: "Product Detail",
							endButton: new sap.m.Button({
								text: "Close",
								press: function(){
									oDialog.close();
								}
							})
					});
					oDialog.open();
					},
					error: function(oErr){
						debugger;
					}
				});
			}else {
				var oItems = oList.getBinding("items");
			var oFilter = new sap.ui.model.Filter("CATEGORY", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilter2 = new sap.ui.model.Filter("type", sap.ui.model.FilterOperator.Contains, sValue);
			var oFilterMain = new sap.ui.model.Filter(
				{
					filters: [oFilter, oFilter2 ],
					and: false
				});	
			}
			
			//oItems.filter(oFilterMain);
			oItems.filter([oFilter]);
			//var oSorter = new sap.ui.model.Sorter("name");
			//oItems.sort(oSorter);
		}	

	});

});