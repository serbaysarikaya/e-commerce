# 🛒 E-Commerce Full Stack Uygulaması

Bu proje, React tabanlı bir kullanıcı arayüzü ve .NET Core Web API altyapısına sahip bir e-ticaret çözümüdür. Ürün listeleme, ödeme alma (iyzico entegrasyonu), kullanıcı işlemleri gibi temel e-ticaret işlevlerini kapsamaktadır.

---

## 📌 Teknolojiler

### ✅ Frontend (Client)
- React
- TypeScript
- Vite
- Axios
- TailwindCSS (varsa)
- React Router
- Context API

### ✅ Backend (API)
- .NET 6 / .NET Core Web API
- Entity Framework Core
- MSSQL
- JWT Authentication
- DTO, Middleware, Service katmanları
- CORS Configuration
- Swagger (kuruluysa)

---

## 💳 Ödeme Entegrasyonu

### 📦 iyzico Entegrasyonu

Projede iyzico API kullanılarak **ödeme alma işlemleri entegrasyonu** yapılmıştır. Kullanıcılar, sepetlerindeki ürünleri satın alırken iyzico ile güvenli bir şekilde ödeme işlemini tamamlayabilir.

---

## 🧱 Proje Yapısı

```bash
e-commerce/
│
├── API/                         # Backend (.NET Core)
│   ├── Controllers              # API controllerları
│   ├── Data                     # DbContext ve Migration ayarları
│   ├── DTO                      # Veri transfer objeleri
│   ├── Entity                   # Veri modelleri
│   ├── Services                 # Business logic ve repository sınıfları
│   ├── Middlewares              # Exception handling, logging, vb.
│   ├── wwwroot/images           # Statik resimler
│   └── appsettings.json         # Ayarlar
│
├── Client/                      # Frontend (React)
│   ├── public/                  # Site genel dosyaları
│   ├── src/                     # React bileşenleri
│   ├── vite.config.ts           # Vite yapılandırması
│   └── package.json             # Bağımlılıklar
│
├── e-commerce.sln               # Çözüm dosyası
└── README.md                    # Bu dosya
