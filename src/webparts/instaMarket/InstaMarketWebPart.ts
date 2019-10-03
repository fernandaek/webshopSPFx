import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import * as strings from 'InstaMarketWebPartStrings';
import InstaMarket from './components/InstaMarket';
import { IInstaMarketProps } from './components/IInstaMarketProps';
import { IGetDataService, MockDataService, PnPDataService } from './components/GetDataService';
import { sp } from 'sp-pnp-js';


export interface IInstaMarketWebPartProps {
  description: string;
}

export default class InstaMarketWebPart extends BaseClientSideWebPart<IInstaMarketWebPartProps> {

  public render(): void {

    let service: IGetDataService;

    if (Environment.type === EnvironmentType.Local) {
      service = new MockDataService();
    } else {
      service = new PnPDataService();
    }

    service.getData().then((result) => {
      sp.web.currentUser.get().then((res) => {
        const element: React.ReactElement<IInstaMarketProps > = React.createElement(
      InstaMarket,
      {
        description: this.properties.description,
        produktList: result,          
        handleSPDataUpdate: service.handleOrderList,
        userId: res.Id,
        orderAndProductHandler: service.handleOrderAndProduct  
      }
    );

    ReactDom.render(element, this.domElement);
   });  
  });
}

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
