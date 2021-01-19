sap.ui.define([
	"acc/fin/ar/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, MessageBox, MessageToast, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("acc.fin.ar.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf acc.fin.ar.view.View2
		 */
			onInit: function() {
			//this.oRouter = this.getOwnerComponent().getRouter();
			Controller.prototype.onInit.apply(this);
			this.oRouter.getRoute("detailproduct").attachMatched(this.showData,this);
			},
			showData: function(oEvent){
				// this.getView().bindElement("/fruits/6");
				var sFruitId = oEvent.getParameters().arguments.fruitid;
				this.getView().bindElement("/" + sFruitId);
				this.getView().byId("suppData").bindElement("To_Supplier");
			},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf acc.fin.ar.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf acc.fin.ar.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf acc.fin.ar.view.View2
		 */
		//	onExit: function() {
		//
		//	}
		onSave: function(){
			MessageBox.confirm("Do you want to Save?", {
			title:	"Confirmation!",
			onClose: function(check){
				if (check === "OK"){
				MessageToast.show("Saved");
				}
			}
			});
		},
		onCancel: function(){
			MessageBox.error("Data cancelled, no save done");
		},
		citiesPopup: null,
		supplierPopup: null,
		inpField: null,
		onValueHelp: function(oEvent){
			this.inpField = oEvent.getSource().getId();
			if (!this.citiesPopup){
				this.citiesPopup = sap.ui.xmlfragment("acc.fin.ar.fragments.popup", this);	
				this.citiesPopup.bindAggregation("items", {
					//path: "/cities",
					path: "/CityCollection",
					template: new sap.m.DisplayListItem({
						label: "{LAND1}",
						value: "{LANDX}"
					})
				});
			//	this.citiesPopup.setMultiSelect(true);
				this.citiesPopup.setTitle("Cities");
				this.getView().addDependent(this.citiesPopup);	
			}
			
			this.citiesPopup.open();
		},
		onPopupSearch: function(oEvent){

			var toBeSearched = oEvent.getParameter("value");
			var oFilter = new Filter("name", FilterOperator.Contains, toBeSearched);
			var nameOfPopup = oEvent.getParameter("itemsBinding").getPath();
			if	(nameOfPopup.indexOf("cities") !== -1 ){
				this.citiesPopup.getBinding("items").filter([oFilter]);
			}else {
				this.supplierPopup.getBinding("items").filter([oFilter]);
			}
		},
		onPopupConfirm: function(oEvent){
			debugger;
			var selectedItem = oEvent.getParameter("selectedItem");
			var sTitle = selectedItem.getLabel();
			sap.ui.getCore().byId(this.inpField).setValue(sTitle);
			this.getView().byId("inpCity").setValue("hello");
		},
		onFilter: function(){

			if (!this.supplierPopup){
				this.supplierPopup = sap.ui.xmlfragment("acc.fin.ar.fragments.popup", this);	
				this.supplierPopup.bindAggregation("items", {
					path: "/suppliers",
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{city}"
					})
				});
				//this.supplierPopup.setMultiSelect(true);
				this.supplierPopup.setTitle("Suppliers");
				this.getView().addDependent(this.supplierPopup);	
			}
			
			this.supplierPopup.open();
		},
		onSupplierSearch: function(oEvent){
			var search = oEvent.getParameter("query");
			var oFilter = new Filter("name", FilterOperator.Contains, search);
			this.getView().byId("suppliersTab").getBinding("items").filter([oFilter]);
		},
		onBack: function(){
			//alert("under construction");
			alert("test");
			var oAppCon = this.getView().getParent();
			oAppCon.to("idView1");
		}

	});

});