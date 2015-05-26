Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      html: "<pre>"+text+"</pre>"
    });
  },
sendEmailObrigadoSolicitarConvite : function (u) {
    
    

    nome=u.name;    
    to=u.email;
    from="no-reply@superangels.com.br";
    subject=nome+", obrigado por se cadastrar";
    url_base=process.env.ROOT_URL;
    if(url_base.charAt(url_base.length-1)!="/"){
        url_base=url_base+"/";
    }
    
    url_pix=url_base+"pix.png";

    html="Ola,"+ nome+",<br><br>"+
    "Você acaba de solicitar um convite para ser uma das primeiras pessoas a utilizar o Super Angels<br>"+
    "Em breve enviaremos mais informações a respeito."+      
    "<img src='"+url_pix+"' width='1' height='1'><br><br>"+
    "Atenciosamente<br>"+
    "Equipe SuperAngels";

    console.log("Enviando email de sendEmailObrigadoSolicitarConvite para "+JSON.stringify(to));  

    check([to, from, subject, html], [String]);
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject ,
      html: html
    });
  }
,


sendEmailSolcicRecebida: function (id_solic,tipo,id_ssr,id_cliente,id_fornecedor) {
    
    
    obj_for=Meteor.users.findOne({_id : id_fornecedor} );
    nome=obj_for.profile.name;    
    to=obj_for.profile.email;
    from="contato.easyfesta@gmail.com";
    subject=nome+",voce recebeu um pedido de orçamento de "+tipo;
    url_base=process.env.ROOT_URL;
    if(url_base.charAt(url_base.length-1)!="/"){
        url_base=url_base+"/";
    }
    url_solic=url_base+"ver_solic/"+id_solic+"/?tipo="+tipo+"&id_ssr="+id_ssr+"&id_cliente="+id_cliente;
    url_pix=url_base+"pix.png";

    html="Ola,"+ nome+",<br><br>"+
    "Voce acaba de receber uma solicitação de orçamento para o serviço: "+tipo+"<br>"+
    "Para ver a solicitação click "+  
    "<a href='"+url_solic+"' title='aqui' >aqui</a>"+
    "<img src='"+url_pix+"' width='1' height='1'><br><br>"+
    "Atenciosamente<br>"+
    "Equipe PowerFesta";

    console.log("Enviando email de sendEmailSolcicRecebida para "+JSON.stringify(to));  

    check([to, from, subject, html], [String]);
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject ,
      html: html
    });
  }
,
sendEmailOrcRecebido: function (id_solic,tipo,id_ssr,id_cliente,id_fornecedor) {

    
    
    obj_user=Meteor.users.findOne({_id : id_cliente} );
    nome=obj_user.profile.name;    
    to=obj_user.profile.email;
    from="contato.easyfesta@gmail.com";
    subject=nome+", voce recebeu um orçamento de "+tipo;
    url_base=process.env.ROOT_URL;

//    console.log("url "+url_base+" "+url_base.charAt(url_base.length-1));

    if(url_base.charAt(url_base.length-1)!="/"){
        url_base=url_base+"/";
    }

//console.log("url "+url_base+" "+url_base.charAt(url_base.length-1));

    url_orc=url_base+"ver_orcamento_cliente/"+id_solic+"/?tipo="+tipo+"&id_ssr="+id_ssr+"&id_fornecedor="+id_fornecedor;
    url_pix=url_base+"pix.png";

    html="Ola,"+ nome+",<br><br>"+
    "Voce acaba de receber um orçamento para o serviço: "+tipo+"<br>"+
    "Para ver a proposta click "+  
    "<a href='"+url_orc+"' title='aqui' >aqui</a>"+
    "<img src='"+url_pix+"' width='1' height='1'><br><br>"+
    "Atenciosamente<br>"+
    "Equipe PowerFesta";

    console.log("Enviando email de sendEmailOrcRecebido para "+JSON.stringify(to));   

    check([to, from, subject, html], [String]);
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject ,
      html: html
    });
  }
,
});
