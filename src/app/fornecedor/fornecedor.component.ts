import { Fornecedor } from './../fornecedor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FornecedorService } from '../fornecedor.service';


@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  fornecedores : Fornecedor [] = [];
  formgrupfornecedor : FormGroup;
  isEditing: boolean = false;

  constructor (private fornecedorService : FornecedorService,
               private formBuilder : FormBuilder
   ){
       this.formgrupfornecedor = formBuilder.group({
         id : [''],
         name : [''],
         active: [false],
         category : [''],
         contact : ['']

       });
   }

  ngOnInit(): void {
   this.loadFornecedor();
 }

 loadFornecedor(){
    this.fornecedorService.getfornecedores().subscribe({
      next: data => this.fornecedores= data,
     error: msg => console.log ("erro ao chamar o endpoint" + msg)
    })
 }

 save(){
      if(this.isEditing){
        this.fornecedorService.update( this.formgrupfornecedor.value).subscribe({

          next: () => {
          this.loadFornecedor();
          this.formgrupfornecedor.reset();
          this.isEditing = false;
          }
        })

      }
      else{
   this.fornecedorService.save(this.formgrupfornecedor.value).subscribe(
     {
             next : data => {
                 this.fornecedores.push(data);
                 this.formgrupfornecedor.reset();
             }
     }

 )

}
 }

delete(fornecedor : Fornecedor): void{
  this.fornecedorService.delete(fornecedor).subscribe({
    next: () => this.loadFornecedor()
  })

}


edit(fornecedor : Fornecedor): void{

  this.formgrupfornecedor.setValue(fornecedor);
  this.isEditing = true;


}

}
