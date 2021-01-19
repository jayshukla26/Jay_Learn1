sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("acc.fin.ar.controller.Add", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf acc.fin.ar.view.Add
		 */
			onInit: function() {
				var oLocalModel = new JSONModel({
					"productData": {
						"PRODUCT_ID": "",
						"TYPE_CODE": "",
						"CATEGORY":  "",
						"NAME": 	"",
						"DESCRIPTION": "",
						"SUPPLIER_ID": "",
						"SUPPLIER_NAME": "",
						"PRICE": "",
						"CURRENCY_CODE": "",
						"DIM_UNIT": ""
					}
				});
				this.getView().setModel(oLocalModel, "localView");
			},
			onValueHelp: function(oEvent){
			this.fieldId = oEvent.getSource();
			
				this.supplierPopup = sap.ui.xmlfragment("acc.fin.ar.fragments.popup", this);	
				this.supplierPopup.bindAggregation("items", {
					//path: "/cities",
					path: "/SupplierCollection",
					template: new sap.m.DisplayListItem({
						label: "{BP_ID}",
						value: "{COMPANY_NAME}"
					})
				});
			//	this.citiesPopup.setMultiSelect(true);
				this.supplierPopup.setTitle("Suppliers");
				this.getView().addDependent(this.supplierPopup);	
			
			
			this.supplierPopup.open();
		},
		onPopupConfirm: function(oEvent){
			var selectedItem = oEvent.getParameter("selectedItem");
			var sTitle = selectedItem.getLabel();
			this.fieldId.setValue(sTitle);
		},
		onExp: function(){
			var oDataModel = this.getView().getModel();
			var that = this;
			oDataModel.callFunction("/GetMostExpensiveProduct", {
				urlParameters: {
					"I_CATEGORY": "Notebooks"
				},
				success: function(data) {
						that.getView().getModel("localView").setProperty("/productData", data);
				},
				error: function(){
					
				}
			});
		},
		
			onSave: function(){
				var oDataModel = this.getView().getModel();
				debugger;
				var oLocalData = this.getView().getModel("localView").getProperty("/productData");
				oDataModel.create("/ProductCollection", oLocalData, {
					success: function(data){
						MessageToast.show("Product has been created");
					},
					error: function(){
						MessageToast.show("Product could not be created");
					}
					
				});
			}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf acc.fin.ar.view.Add
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf acc.fin.ar.view.Add
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf acc.fin.ar.view.Add
		 */
		//	onExit: function() {
		//
		//	}

	});

});