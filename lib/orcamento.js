


Solic = new Meteor.Collection('solic');
SolicServicos = new Meteor.Collection('solic_servico');
SolicServicosRecebidos=new Meteor.Collection('solicServicosRecebidos');
Meteor.methods({
    solicOrcamento: function(s){    

       // console.log("s "+JSON.stringify(s));

        s.arr_servicos=[];
        s.data_solic= new Date();      


        if(s.servicos_procurados_local )  {
            s.servicos_procurados_local=true;
            s.arr_servicos.push("LOCAL");
        }else{
            s.servicos_procurados_local=false;           
        }

        if(s.servicos_procurados_salgados )  {
            s.servicos_procurados_salgados=true;
            s.arr_servicos.push("SALGADOS");
        }else{
            s.servicos_procurados_salgados=false;           
        }

        if(s.servicos_procurados_doces  )  {
            s.servicos_procurados_doces=true;
            s.arr_servicos.push("DOCES");
        }else{
            s.servicos_procurados_doces=false;          
        }

        if(s.servicos_procurados_bolo )  {
            s.servicos_procurados_bolo=true;
            s.arr_servicos.push("BOLO");
        }else{
            s.servicos_procurados_bolo=false;           
        }
        if(s.servicos_procurados_animacao )  {
            s.arr_servicos.push("ANIMACAO");                
            s.servicos_procurados_animacao=true;
        }else{
            s.servicos_procurados_animacao=false;           
        }
        if(s.servicos_procurados_decoracao  )  {
            s.arr_servicos.push("DECORACAO");               
            s.servicos_procurados_decoracao=true;
        }else{
            s.servicos_procurados_decoracao=false;          
        }
        if(s.servicos_procurados_outros  )  {
            s.arr_servicos.push("OUTROS");              
            s.servicos_procurados_outros=true;
        }else{
            s.servicos_procurados_outros=false;         
        }               


        if(s.servicos_procurados_local  || s.servicos_procurados_salgados || s.servicos_procurados_doces || s.servicos_procurados_bolo ||
            s.servicos_procurados_outros || s.servicos_procurados_decoracao || s.servicos_procurados_animacao)  {
            s.tem_servicos=true;
        }else{
            s.tem_servicos=false;           
        }                      

        id_solic=Solic.insert(s);

        Meteor.call('sendEmail',
            "william.mori@gmail.com",
            "contato.easyfesta@gmail.com",
            '[POWERFESTA] Solicitação Cadastrada',
            'SOLIC '+JSON.stringify(s, null, 4));



         if(s.servicos_procurados_local  )  {
            SolicServicos.insert({
                id_solic : id_solic ,
                tipo : "LOCAL" ,
                id_usuario: s.id_usuario , 
                bairros: s.servicos_procurados_local_bairros   ,
                observacoes: s.servico_procurado_observacoes_local,
                qtd_orcamento : 0,
                qtd_orcamento_novos : 0,
                data_solic: new Date()
            });   


        
            fornecedores=FornecedorServicos.find({ tipo: "LOCAL" });
            fornecedores.forEach(function (fornecedor,i) {



                console.log("fornecedor a solicitar LOCAL "+JSON.stringify(fornecedor));
                ssr={
                    id_solic : id_solic ,
                    tipo : "LOCAL" ,
                    id_cliente: s.id_usuario , 
                    id_fornecedor : fornecedor.id_fornecedor ,
                    respondido : false ,                    
                    data_solic: new Date()
                };
                console.log("par da chamada "+JSON.stringify(ssr));
                id_ssr=SolicServicosRecebidos.insert(ssr); 
              //  console.log("Resultado "+JSON.stringify(id_ssr));
              //  console.log("Chamando sendEmailSolcicRecebida id_solic "+id_solic+" tipo LOCAL "+id_ssr+" id_cliente "+s.id_usuario+" id_fornecedor "+fornecedor.id_fornecedor);
                Meteor.call('sendEmailSolcicRecebida',id_solic,"LOCAL",id_ssr,s.id_usuario,fornecedor.id_fornecedor);

            });
        }

        if(s.servicos_procurados_salgados )  {
            SolicServicos.insert({
                id_solic : id_solic ,
                tipo : "SALGADOS" ,
                id_usuario: s.id_usuario , 
                observacoes: s.servico_procurado_observacoes_salgados,
                qtd_orcamento : 0,
                qtd_orcamento_novos : 0,                
                data_solic: new Date()
            }); 
            fornecedores=FornecedorServicos.find({ tipo: "SALGADOS" });
            fornecedores.forEach(function (fornecedor,i) {

                ssr={
                    id_solic : id_solic ,
                    tipo : "SALGADOS" ,
                    id_cliente: s.id_usuario , 
                    id_fornecedor : fornecedor.id_fornecedor ,
                    respondido : false ,                    
                    data_solic: new Date()
                };
                  id_ssr=SolicServicosRecebidos.insert(ssr); 
              //  console.log("Resultado "+JSON.stringify(id_ssr));
              //  console.log("Chamando sendEmailSolcicRecebida id_solic "+id_solic+" tipo SALGADOS "+id_ssr+" id_cliente "+s.id_usuario+" id_fornecedor "+fornecedor.id_fornecedor);
                Meteor.call('sendEmailSolcicRecebida',id_solic,"SALGADOS",id_ssr,s.id_usuario,fornecedor.id_fornecedor);
            });
        }

        if(s.servicos_procurados_doces  )  {
            SolicServicos.insert({
                id_solic : id_solic ,
                tipo : "DOCES" ,
                id_usuario: s.id_usuario , 
                observacoes: s.servico_procurado_observacoes_doces,
                qtd_orcamento : 0,
                qtd_orcamento_novos : 0,                
                data_solic: new Date()
            });
            fornecedores=FornecedorServicos.find({ tipo: "DOCES" });
            fornecedores.forEach(function (fornecedor,i) {

                ssr={
                    id_solic : id_solic ,
                    tipo : "DOCES" ,
                    id_cliente: s.id_usuario , 
                    id_fornecedor : fornecedor.id_fornecedor ,
                    respondido : false ,                    
                    data_solic: new Date()
                };
                  id_ssr=SolicServicosRecebidos.insert(ssr); 
              //  console.log("Resultado "+JSON.stringify(id_ssr));
              //  console.log("Chamando sendEmailSolcicRecebida id_solic "+id_solic+" tipo DOCES "+id_ssr+" id_cliente "+s.id_usuario+" id_fornecedor "+fornecedor.id_fornecedor);
                Meteor.call('sendEmailSolcicRecebida',id_solic,"DOCES",id_ssr,s.id_usuario,fornecedor.id_fornecedor);
            });
        }

        if(s.servicos_procurados_bolo )  {
            SolicServicos.insert({
                id_solic : id_solic ,
                tipo : "BOLO" ,
                id_usuario: s.id_usuario , 
                observacoes: s.servico_procurado_observacoes_bolo,
                qtd_orcamento : 0,
                qtd_orcamento_novos : 0,                
                data_solic: new Date()
            });
            fornecedores=FornecedorServicos.find({ tipo: "BOLO" });
            fornecedores.forEach(function (fornecedor,i) {

                ssr={
                    id_solic : id_solic ,
                    tipo : "BOLO" ,
                    id_cliente: s.id_usuario , 
                    id_fornecedor : fornecedor.id_fornecedor ,
                    respondido : false ,                    
                    data_solic: new Date()
                };
                  id_ssr=SolicServicosRecebidos.insert(ssr); 
              //  console.log("Resultado "+JSON.stringify(id_ssr));
              //  console.log("Chamando sendEmailSolcicRecebida id_solic "+id_solic+" tipo BOLO "+id_ssr+" id_cliente "+s.id_usuario+" id_fornecedor "+fornecedor.id_fornecedor);
                Meteor.call('sendEmailSolcicRecebida',id_solic,"BOLO",id_ssr,s.id_usuario,fornecedor.id_fornecedor);       
            });
        }
        if(s.servicos_procurados_animacao )  {
            SolicServicos.insert({
                id_solic : id_solic ,
                tipo : "ANIMACAO" ,
                id_usuario: s.id_usuario , 
                observacoes: s.servico_procurado_observacoes_animacao,
                qtd_orcamento : 0,
                qtd_orcamento_novos : 0,                
                data_solic: new Date()
            });
            fornecedores=FornecedorServicos.find({ tipo: "ANIMACAO" });
            fornecedores.forEach(function (fornecedor,i) {

                ssr={
                    id_solic : id_solic ,
                    tipo : "ANIMACAO" ,
                    id_cliente: s.id_usuario , 
                    id_fornecedor : fornecedor.id_fornecedor ,
                    respondido : false ,                    
                    data_solic: new Date()
                };
                  id_ssr=SolicServicosRecebidos.insert(ssr); 
              //  console.log("Resultado "+JSON.stringify(id_ssr));
              //  console.log("Chamando sendEmailSolcicRecebida id_solic "+id_solic+" tipo ANIMACAO "+id_ssr+" id_cliente "+s.id_usuario+" id_fornecedor "+fornecedor.id_fornecedor);
                Meteor.call('sendEmailSolcicRecebida',id_solic,"ANIMACAO",id_ssr,s.id_usuario,fornecedor.id_fornecedor);    
            });
        }
        if(s.servicos_procurados_decoracao  )  {
            SolicServicos.insert({
                id_solic :id_solic ,
                tipo : "DECORACAO" ,
                id_usuario: s.id_usuario , 
                observacoes: s.servico_procurado_observacoes_decoracao,
                qtd_orcamento : 0,
                qtd_orcamento_novos : 0,                
                data_solic: new Date()
            });
            fornecedores=FornecedorServicos.find({ tipo: "DECORACAO" });
            fornecedores.forEach(function (fornecedor,i) {

                ssr={
                    id_solic : id_solic ,
                    tipo : "DECORACAO" ,
                    id_cliente: s.id_usuario , 
                    id_fornecedor : fornecedor.id_fornecedor ,
                    respondido : false ,                    
                    data_solic: new Date()
                };
                  id_ssr=SolicServicosRecebidos.insert(ssr); 
              //  console.log("Resultado "+JSON.stringify(id_ssr));
              //  console.log("Chamando sendEmailSolcicRecebida id_solic "+id_solic+" tipo DECORACAO "+id_ssr+" id_cliente "+s.id_usuario+" id_fornecedor "+fornecedor.id_fornecedor);
                Meteor.call('sendEmailSolcicRecebida',id_solic,"DECORACAO",id_ssr,s.id_usuario,fornecedor.id_fornecedor);  
            });
        }
        if(s.servicos_procurados_outros  )  {
            SolicServicos.insert({
                id_solic : id_solic ,
                tipo : "OUTROS" ,
                id_usuario: s.id_usuario , 
                observacoes: s.servico_procurado_observacoes_outros,
                qtd_orcamento : 0,
                qtd_orcamento_novos : 0,                
                data_solic: new Date()
            });
            fornecedores=FornecedorServicos.find({ tipo: "OUTROS" });
            fornecedores.forEach(function (fornecedor,i) {

                ssr={
                    id_solic : id_solic ,
                    tipo : "OUTROS" ,
                    id_cliente: s.id_usuario , 
                    id_fornecedor : fornecedor.id_fornecedor ,
                    respondido : false ,
                    data_solic: new Date()
                };
                  id_ssr=SolicServicosRecebidos.insert(ssr); 
              //  console.log("Resultado "+JSON.stringify(id_ssr));
              //  console.log("Chamando sendEmailSolcicRecebida id_solic "+id_solic+" tipo OUTROS "+id_ssr+" id_cliente "+s.id_usuario+" id_fornecedor "+fornecedor.id_fornecedor);
                Meteor.call('sendEmailSolcicRecebida',id_solic,"OUTROS",id_ssr,s.id_usuario,fornecedor.id_fornecedor);    
            });
        }  
        return id_solic;
    },  
});
Orcamento = new Meteor.Collection('orcamento');
Meteor.methods({
  fazerOrcamento: function(o){  
    
    console.log("o "+JSON.stringify(o));
    if(!o.id_ssr){

        ssr={
        id_solic : o.id_solic ,
        tipo :  o.tipo,
        id_cliente: o.id_cliente , 
        id_fornecedor : o.id_fornecedor ,
        respondido : false ,
        data_solic: new Date()
        };

        console.log("Cadastrar solicitação de serviço para o fornecedor "+JSON.stringify(ssr));                                 
        o.id_ssr =  SolicServicosRecebidos.insert(ssr);
        
        
    }
    console.log("Orcamento "+JSON.stringify(o));
    res= Orcamento.insert(o);
    if(res){
        res2=SolicServicosRecebidos.update(o.id_ssr,{
                $set : {
                    respondido : true
                }
        });

        Meteor.call('sendEmail',
            "william.mori@gmail.com",
            "contato.easyfesta@gmail.com",
            '[POWERFESTA] Orçamento Cadastrado',
            'ORC '+JSON.stringify(o, null, 4));
        Meteor.call('sendEmailOrcRecebido',o.id_solic,o.tipo,o.id_ssr,o.id_cliente,o.id_fornecedor);

    }
    return res && res2;
  },  
});

FornecedorServicos = new Meteor.Collection('fornecedorServicos');
Meteor.methods({
  addFornecedorServico: function(o){    
    return FornecedorServicos.insert(o);
  },  
});
Meteor.methods({
  addSolicServicosRecebidos: function(o){    
    id_ssr =  SolicServicosRecebidos.insert(o);
    console.log("id_ssr "+id_ssr+" "+JSON.stringify(o));
    return id_ssr;

  },  
});






/*    nome_contato: {
        type: String,
        label: "Nome Contato",
        max: 200
    },
    email_contato: {
        type: String,
        label: "Email Contato",
        max: 200
    },
    telefone_contato: {
        type: String,
        label: "Telefone Contato",
        max: 15
    },
    relacao_contato: {
        type: String,
        label: "Realção Contato",
        max: 50,
        optional: true
    },
    nome_aniversariante: {
        type: String,
        label: "Nome aniversariante",
        max: 150,
        optional: true
    },
    sexo_aniversariante: {
        type: String,
        label: "Sexo aniversariante",
        max: 20,
        optional: true
    },
    data_nasc_aniversariante: {
        type: String,
        label: "Data aniversario",
        optional: true
    }, 
    festa_convidados: {
        type: Number,
        label: "Quantidade convidados",
        min: 0,
        optional: true
    },
    festa_data: {
        type: String,
        label: "Data da festa",
        optional: true
    },     
    festa_hora: {
        type: String,
        label: "Hora da festa",
        max: 10,
        optional: true
    },
    festa_detalhes: {
        type: String,
        label: "Detalhes da festa",
        optional: true
    },    
    procurarLocalFesta: {
        type: String,
        label: "Procurar Local da festa",
        optional: true
    },
    local_nome: {
        type: String,
        label: "Nome do Local",
        optional: true
    },
    local_endereco: {
        type: String,
        label: "Endereço do Local",
        optional: true
    },
    local_procurado_bairros: {
        type: String,
        label: "Bairros Procurados",
        optional: true
    },
    local_procurado_observacoes: {
        type: String,
        label: "local_procurado_observacoes",
        optional: true
    },    
    servicos_procurados_salgados: {
        type: String,
        label: "servicos_procurados_salgados",
        optional: true
    },    
    servico_procurado_observacoes_salgados: {
        type: String,
        label: "servico_procurado_observacoes_salgados",
        optional: true
    },    
    servicos_procurados_doces: {
        type: String,
        label: "servicos_procurados_doces",
        optional: true
    },    
    servico_procurado_observacoes_doces: {
        type: String,
        label: "servico_procurado_observacoes_doces",
        optional: true
    },    
    servicos_procurados_bolo: {
        type: String,
        label: "servicos_procurados_bolo ",
        optional: true
    },    
    servico_procurado_observacoes_bolo: {
        type: String,
        label: "servico_procurado_observacoes_bolo",
        optional: true
    },    
    servicos_procurados_animacao: {
        type: String,
        label: "servicos_procurados_animacao",
        optional: true
    },    
    servico_procurado_observacoes_animacao: {
        type: String,
        label: "servico_procurado_observacoes_animacao",
        optional: true
    },    
    servicos_procurados_decoracao: {
        type: String,
        label: "servicos_procurados_decoracao",
        optional: true
    },    
    servico_procurado_observacoes_decoracao: {
        type: String,
        label: "servico_procurado_observacoes_decoracao",
        optional: true
    },    
    servicos_procurados_outros: {
        type: String,
        label: "servicos_procurados_outros",
        optional: true
    },    
    servico_procurado_observacoes_outros_servicos: {
        type: String,
        label: "servico_procurado_observacoes_outros_servicos",
        optional: true
    },   
    data_solic: {
        type: String,
        label: "Data solicitação",
        optional: true
    },         
});

Solic.attachSchema(Schemas.Solic);
*/



