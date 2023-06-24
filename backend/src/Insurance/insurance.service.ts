/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { CreateInsuranceDto, CreateInsurancePhotoDto } from "./dto/dto.create.insurance";
import { UpdateByAdminInsurance, UpdateInsuranceDto } from "./dto/update.insurance.dto";

@Injectable()
export class InsuranceService{
  constructor(private prisma:PrismaService){}
  async createInsurance(userId:number,dto:CreateInsuranceDto,photo:CreateInsurancePhotoDto){
    const insurance = await this.prisma.user_Insurance.create({
          data: {
            userId,
          
            propertytype:dto.type,
            size:Number(dto.size),
            location:dto.location,
            coveragelevel:dto.level,
            deposit:Number(0.0),
            room:Number(dto.room),
            Document:photo.Document,

           
            
            
            
            
          } 
      })
    return insurance;
  }

  async getInsurance(userId : number){
    const insurance= await this.prisma.user_Insurance.findMany({
      where: {
        userId:userId,
        },
      include: {
        coverege_request:true
      }
      } )
    return insurance;
  }

  async getInsuranceById(userId:number,insuranceId:number){
    const insurance=await this.prisma.user_Insurance.findFirst({
      where: {
        userId:userId,
        id:insuranceId,}})
    return insurance;

  }


  async updateInsurance(insuranceId:number,updateDto:UpdateInsuranceDto){
    const insurance=await this.prisma.user_Insurance.update({
      where: {
        id: insuranceId
      },
      data: {...updateDto,

      }
    })
    return insurance;
  }

  async deleteInsurance(insuranceId:number){
    const insurance=await this.prisma.user_Insurance.findFirst({
      where:{id:insuranceId}
    })
    if (insurance){
    await this.prisma.user_Insurance.delete({
      where: {
        id:insuranceId
      }})
    return "Deleted Succesfully!!";}
    else{
      return 'No Houses found to Delete!!';
    }
  }


async getInsuranceBYAdmin(){
  console.log("here in backend admin insurance");
  const insurance= await this.prisma.user_Insurance.findMany({
    where: {
      status:false,
      monthly_payment:null,
      telebirr_QR:null,
      }} )
  return insurance;
  
  
}

async getInsuranceBYAdminById(insuranceId:number){
  const insurance=await this.prisma.user_Insurance.findFirst({
    where: {
     
      status:false,
      monthly_payment:null,
      telebirr_QR:null,
      id:insuranceId,}})
  return insurance;
}

// UpdateByAdminInsurance
async ApproveInsuranceBYAdmin(insuranceId:number,updateDto:UpdateByAdminInsurance){

  const insurance=await this.prisma.user_Insurance.update({
    where: {
     
      
      id: insuranceId
    },
    data: {monthly_payment:Number(updateDto.monthly_payment),
    telebirr_QR:updateDto.telebirr_QR,
    status:Boolean(updateDto.status)},

    })
  return insurance;
}




}