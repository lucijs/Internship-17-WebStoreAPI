import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartsModule } from './carts/carts.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, CategoriesModule, CartsModule, WishlistsModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
