# Uni-modal

Pure Javascript Modal Plugin

### Gereksinimler

Herhangi bir gereksinime ihtiyaç duymamaktadır.


### Yükleme(Installing)

1-Npm Kullanarak

```
npm install uni-modal
```

2- Direk indirme yöntemiyle bu adresten indirebilirsiniz. https://github.com/fat19/uni-modal

### Kullanım(Usage)

Explain what these tests test and why

Sayfaya modal.js i çağırma 
```
<script src="modal.js" type="text/javascript"></script>
```

Sayfaya modal.css i çağırma 
```
<link href="modal.css" rel="stylesheet" type="text/css" />
```

Herhangi bir js dosyasının içinde
```
var modal = new Modal({
    caption: 'Modal Başlık',
    content: 'Modal içerik',
    customClass: 'test',
    animation: 'fade-and-drop',
    fixedHeight: '500px'
    width: {
        mobile: '80%',
        desktop: '500px'
    }
    overlayClose: true,
    closeButton: true,
    callback: function() {
        console.log('Modal Açıldı')
    }
})
// Modal açmak için 
modal.open();

// Modal kapatmak için 
modal.close()
```


## Options

| Key              | Default              | Values                     |  Description                                                                       |
| -----------------|:--------------------:|---------------------------:|-----------------------------------------------------------------------------------:|
| caption          | `''`                 | String                     | Bir caption tanımlanmazsa modal başlık boş olarak gelecektir                       |
| content          | `''`                 | String                     | Modal içerisinde gösterilmek istenen içerik buraya gelecek                         |
| customClass      | `''`                 | String                     | modal classının yanına yeni class eklenerek özelleştirme yapılabilir               |
| animation        | `''`                 | fade-and-drop              | Bu özellik kullanılarak yukarıdan aşağıya düşme efekti verilebilir                 |
| fixedHeight      | `''`                 | String                     | Modala sabit bir yükseklik verilebilir.                                            |
| width            | M:`80vw`, D: `500px` | String veya Object         | Sabit bir width verilerek veya mobile ve desktop için ayrı ayrı width verilebilir  |
| overlayClose     | `true`               | Boolean                    | Overlaya tıklayınca modal ın kapanıp açılma durmunu ayarlar                        |
| closeButton      | `true`               | Boolean                    | Closebutton un kapatılıp açılmasını ayarlar                                        |
| callback         | `funciton`           | Function                   | Modal açıldıktan sonra yapılmak istenen işlemler var ise burada yapılabilir        |


### width options ile ilgili 
Width options hem string hemde object bir değer alabilir.
* Sabit bir width değeri verilerek tüm cihazlarda aynı genişlikte olması sağlanabilir. Örneğin;
```
widdth: '500px'
```
* width bir obje olarak da tanımlanabilir. Width objesi mobile ve desktop adında iki farklı değer alır. 1200px in altında mobile için geçerli değer çalışırken, 1200px yukarısında ise desktop içine yazılmış olan değer çalışır.   
```
widdth: {
    mobile: '80%',
    desktop: '300px'
}
```
### Modal açık iken yeni bir modal çağrılırsa
Modal her açıldığında window objesinin altına isModalActive = true şeklinde bir değer atar ve yeni bir modal çağrıldığında kullanıcının hangi optionsları gönderdiğine bakılmaksızın sadece caption ve content özelliği değiştirilir.
```
// Modal açık iken ikinci bir modal açıkmak istenirse sadece caption ve content gönderilir. Diğer optionslar gönderilse bile geçersiz olacaktır. 
var modal = new Modal({
    caption: 'Modal Başlık',
    content: 'Modal içerik'
})
 
```

## Authors

*  [**Fatih Altın**](https://github.com/fat19)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


